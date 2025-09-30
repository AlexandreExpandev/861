import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * @summary Middleware for request validation using Zod schemas
 */
export function validationMiddleware(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: error.errors
        },
        timestamp: new Date().toISOString()
      });
    }
  };
}
