import { Request, Response, NextFunction } from 'express';

/**
 * @summary Middleware to handle 404 Not Found errors
 */
export function notFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
  res.status(404).json({
    success: false,
    error: {
      message: `Route not found: ${req.method} ${req.originalUrl}`
    },
    timestamp: new Date().toISOString()
  });
}
