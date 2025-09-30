import { z } from 'zod';

/**
 * @summary Validation schema for user registration
 */
export const registerSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less'),
  email: z.string()
    .email('Invalid email address')
    .max(100, 'Email must be 100 characters or less'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be 100 characters or less')
});

/**
 * @summary Validation schema for user login
 */
export const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address'),
  password: z.string()
    .min(1, 'Password is required')
});
