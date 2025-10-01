import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/response';

/**
 * @summary Global error handling middleware
 */
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  console.error('Error:', err);

  // Default error status and message
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json(errorResponse(message));
}
