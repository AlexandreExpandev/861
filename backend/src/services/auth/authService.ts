import bcrypt from 'bcrypt';
import jwt, { Secret } from 'jsonwebtoken';
import { config } from '../../config';
import { dbRequest } from '../../database';
import { LoginParams, RegisterParams, AuthResult } from './authTypes';

/**
 * @summary Register a new user
 */
export async function registerUser(params: RegisterParams): Promise<AuthResult> {
  try {
    const { name, email, password } = params;

    // Check if email already exists
    const existingUsers = await dbRequest('SELECT * FROM users WHERE email = @email', { email });

    if (existingUsers.length > 0) {
      const error: any = new Error('Email already in use');
      error.code = 'EMAIL_EXISTS';
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, config.security.bcryptRounds);

    // Create user
    const result = await dbRequest(
      `INSERT INTO users (name, email, password, dateCreated, active) 
       VALUES (@name, @email, @hashedPassword, GETUTCDATE(), 1);
       SELECT SCOPE_IDENTITY() AS idUser;`,
      { name, email, hashedPassword }
    );

    const idUser = result[0].idUser;

    // Generate token
    const token = jwt.sign({ idUser, email, name }, config.security.jwtSecret as Secret, {
      expiresIn: config.security.jwtExpiration as string | number,
    });

    return {
      user: {
        idUser,
        name,
        email,
      },
      token,
    };
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

/**
 * @summary Login a user
 */
export async function loginUser(params: LoginParams): Promise<AuthResult | null> {
  try {
    const { email, password } = params;

    // Find user by email
    const users = await dbRequest('SELECT * FROM users WHERE email = @email AND active = 1', {
      email,
    });

    if (users.length === 0) {
      return null;
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return null;
    }

    // Generate token
    const token = jwt.sign(
      { idUser: user.idUser, email: user.email, name: user.name },
      config.security.jwtSecret as Secret,
      { expiresIn: config.security.jwtExpiration as string | number }
    );

    return {
      user: {
        idUser: user.idUser,
        name: user.name,
        email: user.email,
      },
      token,
    };
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}
