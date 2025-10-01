import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { ValidationError } from '../utils/errors';

/**
 * @summary
 * Request validation middleware using Zod schemas
 */
export const validationMiddleware = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate request body against schema
      const validatedData = await schema.parseAsync(req.body);

      // Replace request body with validated data
      req.body = validatedData;

      next();
    } catch (error: unknown) {
      // Format Zod validation errors
      if ((error as any).errors) {
        const validationErrors = (error as any).errors.map((err: any) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        next(new ValidationError('Validation failed', validationErrors));
      } else {
        next(error);
      }
    }
  };
};
