import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

/**
 * @summary
 * Middleware factory that creates validation middleware using Zod schemas.
 *
 * @param schema - The Zod schema to validate against
 */
export const validationMiddleware = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate request body against schema
      const validatedData = await schema.parseAsync(req.body);

      // Replace request body with validated data
      req.body = validatedData;

      next();
    } catch (error: any) {
      // Return validation errors
      res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Validation failed',
          details: error.errors || error.message,
        },
        timestamp: new Date().toISOString(),
      });
    }
  };
};
