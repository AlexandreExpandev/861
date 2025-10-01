import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { userLogin, userRegister } from '../../../../services/user';
import { errorResponse, successResponse } from '../../../../utils/response';

/**
 * @summary Handle user login
 */
export async function loginHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const schema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json(errorResponse('Invalid credentials'));
      return;
    }

    const { email, password } = result.data;
    const loginResult = await userLogin(email, password);

    if (!loginResult) {
      res.status(401).json(errorResponse('Invalid credentials'));
      return;
    }

    res.json(successResponse(loginResult));
  } catch (error: any) {
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
    const schema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json(errorResponse('Invalid registration data'));
      return;
    }

    const { name, email, password } = result.data;
    const user = await userRegister(name, email, password);

    res.status(201).json(successResponse(user));
  } catch (error: any) {
    if (error.message === 'EmailAlreadyExists') {
      res.status(409).json(errorResponse('Email already in use'));
      return;
    }
    next(error);
  }
}
