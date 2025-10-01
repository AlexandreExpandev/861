import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { JwtPayload } from '../services/user/userTypes';
import { errorResponse } from '../utils/response';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * @summary Authentication middleware to verify JWT tokens
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  // Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json(errorResponse('No token provided'));
    return;
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.security.jwtSecret) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json(errorResponse('Invalid token'));
  }
}
