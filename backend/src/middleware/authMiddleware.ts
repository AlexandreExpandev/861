import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { AuthError } from '../utils/errors';

/**
 * @summary
 * Authentication middleware to verify JWT tokens
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new AuthError('No token provided');
    }

    // Verify token
    const decoded = jwt.verify(token, config.security.jwtSecret) as {
      id: number;
      email: string;
      name: string;
    };

    // Add user info to request object
    req.user = decoded;

    next();
  } catch (error: unknown) {
    if (
      (error as any).name === 'JsonWebTokenError' ||
      (error as any).name === 'TokenExpiredError'
    ) {
      next(new AuthError('Invalid or expired token'));
    } else {
      next(error);
    }
  }
};
