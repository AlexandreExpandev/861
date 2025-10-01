import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { errorResponse, successResponse } from '../../../../middleware/crud';
import { loginUser, registerUser } from '../../../../services/auth/authService';

/**
 * @summary
 * User login handler
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const validatedData = await loginSchema.parseAsync(req.body);

    const result = await loginUser({
      email: validatedData.email,
      password: validatedData.password,
    });

    if (!result.success) {
      return res.status(401).json(errorResponse(result.message || 'Invalid credentials'));
    }

    res.json(
      successResponse({
        token: result.token,
        user: result.user,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res
        .status(422)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    }
    next(error);
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
    const registerSchema = z.object({
      name: z.string().min(2).max(100),
      email: z.string().email(),
      password: z.string().min(6).max(100),
    });

    const validatedData = await registerSchema.parseAsync(req.body);

    const result = await registerUser({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
    });

    if (!result.success) {
      return res.status(400).json(errorResponse(result.message || 'Registration failed'));
    }

    res.status(201).json(
      successResponse({
        message: 'User registered successfully',
        user: result.user,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res
        .status(422)
        .json(errorResponse('Validation failed', 'VALIDATION_ERROR', error.errors));
    }
    next(error);
  }
}
