import { Request, Response } from 'express';
import { errorResponse } from '../utils/response';

/**
 * @summary 404 Not Found middleware
 */
export function notFoundMiddleware(req: Request, res: Response): void {
  res.status(404).json(errorResponse('Resource not found'));
}
