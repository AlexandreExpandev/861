import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import { errorResponse } from '../utils/response';

/**
 * @summary Request validation middleware using Zod schemas
 * @param schema Zod validation schema
 */
export function validationMiddleware(schema: AnyZodObject) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        }));

        res.status(400).json(errorResponse('Validation failed', formattedErrors));
        return;
      }
      next(error);
    }
  };
}
