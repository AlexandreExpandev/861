import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { userLogin, userRegister } from '../../../../services/user';
import { successResponse } from '../../../../utils/responses';
import { ValidationError, AuthError } from '../../../../utils/errors';

// Validation schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

/**
 * @summary
 * User login handler
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const validatedData = await loginSchema.parseAsync(req.body);

    // Attempt login
    const result = await userLogin(validatedData.email, validatedData.password);

    // Return success response with token
    res.json(successResponse(result));
  } catch (error: unknown) {
    if ((error as any).name === 'ZodError') {
      const validationErrors = (error as any).errors.map((err: any) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      next(new ValidationError('Validation failed', validationErrors));
    } else {
      next(error);
    }
  }
}

/**
 * @summary
 * User registration handler
 */
export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Validate request body
    const validatedData = await registerSchema.parseAsync(req.body);

    // Register new user
    const result = await userRegister(validatedData);

    // Return success response with token
    res.status(201).json(successResponse(result));
  } catch (error: unknown) {
    if ((error as any).name === 'ZodError') {
      const validationErrors = (error as any).errors.map((err: any) => ({
        path: err.path.join('.'),
        message: err.message,
      }));

      next(new ValidationError('Validation failed', validationErrors));
    } else {
      next(error);
    }
  }
}
