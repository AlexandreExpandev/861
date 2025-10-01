import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../../instances/database';
import { config } from '../../config';
import { User, UserRegister } from './userTypes';
import { AuthError } from '../../utils/errors';

/**
 * @summary
 * Generate JWT token for user
 *
 * @param user User object
 * @returns JWT token
 */
function generateToken(user: User): string {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    config.security.jwtSecret,
    { expiresIn: config.security.jwtExpiresIn }
  );
}

/**
 * @summary
 * User login service
 *
 * @param email User email
 * @param password User password
 * @returns User data with token
 */
export async function userLogin(
  email: string,
  password: string
): Promise<{ user: Omit<User, 'password'>; token: string }> {
  try {
    // Find user by email
    const user = await db.user.findUnique({ where: { email } });

    // Check if user exists
    if (!user) {
      throw new AuthError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AuthError('Invalid email or password');
    }

    // Generate token
    const token = generateToken(user);

    // Return user data without password and token
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
}

/**
 * @summary
 * User registration service
 *
 * @param userData User registration data
 * @returns User data with token
 */
export async function userRegister(
  userData: UserRegister
): Promise<{ user: Omit<User, 'password'>; token: string }> {
  try {
    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { email: userData.email } });

    if (existingUser) {
      throw new AuthError('Email already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, config.security.bcryptRounds);

    // Create new user
    const newUser = await db.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });

    // Generate token
    const token = generateToken(newUser);

    // Return user data without password and token
    const { password: _, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
    };
  } catch (error) {
    throw error;
  }
}
