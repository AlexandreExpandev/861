import { Request, Response } from 'express';

/**
 * @summary
 * Middleware to handle 404 Not Found errors for routes that don't exist.
 */
export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: {
      code: 'RESOURCE_NOT_FOUND',
      message: `The requested resource at ${req.originalUrl} was not found`,
    },
    timestamp: new Date().toISOString(),
  });
};
