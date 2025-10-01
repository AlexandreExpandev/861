import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { db } from '../../instances/database';
import { User, UserWithToken } from './userTypes';

/**
 * @summary Register a new user
 * @param name User's name
 * @param email User's email
 * @param password User's password
 * @returns Created user with token
 */
export async function userRegister(
  name: string,
  email: string,
  password: string
): Promise<UserWithToken> {
  // Check if email already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('EmailAlreadyExists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, config.security.bcryptRounds);

  // Create user
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  // Generate token
  const token = generateToken(user.id);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
}

/**
 * @summary Login a user
 * @param email User's email
 * @param password User's password
 * @returns User with token or null if invalid credentials
 */
export async function userLogin(email: string, password: string): Promise<UserWithToken | null> {
  // Find user by email
  const user = await db.user.findUnique({
    where: { email },
  });

  if (!user) {
    return null;
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return null;
  }

  // Generate token
  const token = generateToken(user.id);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    token,
  };
}

/**
 * @summary Get user by ID
 * @param userId User ID
 * @returns User or null if not found
 */
export async function userGet(userId: number): Promise<User | null> {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

/**
 * @summary Generate JWT token for user
 * @param userId User ID
 * @returns JWT token
 */
function generateToken(userId: number): string {
  return jwt.sign({ id: userId }, config.security.jwtSecret, {
    expiresIn: config.security.jwtExpiresIn,
  });
}
