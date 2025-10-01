import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { dbRequest } from '../../utils/database';
import {
  LoginParams,
  LoginResult,
  RegisterParams,
  RegisterResult,
  User,
  UserPayload,
} from './authTypes';

/**
 * @summary
 * Authenticate a user and generate a JWT token
 */
export async function loginUser({ email, password }: LoginParams): Promise<LoginResult> {
  try {
    // Find user by email
    const users = await dbRequest(
      'SELECT id, name, email, password FROM users WHERE email = @email AND deleted = 0',
      { email }
    );

    if (users.length === 0) {
      return { success: false, message: 'Invalid email or password' };
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Generate JWT token
    const payload: UserPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, config.security.jwtSecret, {
      expiresIn: config.security.jwtExpiresIn,
    });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Authentication failed' };
  }
}

/**
 * @summary
 * Register a new user
 */
export async function registerUser({
  name,
  email,
  password,
}: RegisterParams): Promise<RegisterResult> {
  try {
    // Check if user already exists
    const existingUsers = await dbRequest('SELECT id FROM users WHERE email = @email', { email });

    if (existingUsers.length > 0) {
      return { success: false, message: 'Email already in use' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.security.bcryptRounds);

    // Create user
    const result = await dbRequest(
      `INSERT INTO users (name, email, password, createdAt, updatedAt) 
       VALUES (@name, @email, @hashedPassword, GETUTCDATE(), GETUTCDATE());
       SELECT SCOPE_IDENTITY() AS id;`,
      { name, email, hashedPassword }
    );

    const userId = result[0].id;

    return {
      success: true,
      user: {
        id: userId,
        name,
        email,
      },
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed' };
  }
}
