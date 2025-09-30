import { Request, Response, NextFunction } from 'express';
import { loginUser, registerUser } from '../../../../services/auth/authService';
import { errorResponse, successResponse } from '../../../../middleware/crud';
import { validationMiddleware } from '../../../../middleware/validationMiddleware';
import { loginSchema, registerSchema } from '../../../../services/auth/authValidation';

/**
 * @summary Handle user login
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // Validate request body
    const validatedData = loginSchema.parse(req.body);

    const result = await loginUser(validatedData);

    if (!result) {
      res.status(401).json(errorResponse('Invalid credentials'));
      return;
    }

    res.json(successResponse(result));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
      return;
    }
    next(error);
  }
}

/**
 * @summary Handle user registration
 */
export async function registerHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Validate request body
    const validatedData = registerSchema.parse(req.body);

    const result = await registerUser(validatedData);

    res.status(201).json(successResponse(result));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res.status(400).json(errorResponse('Validation failed', error.errors));
      return;
    }
    if (error.code === 'EMAIL_EXISTS') {
      res.status(409).json(errorResponse('Email already in use'));
      return;
    }
    next(error);
  }
}
