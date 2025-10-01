import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});

export const loginCredentialsSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerCredentialsSchema = loginCredentialsSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type RegisterCredentials = z.infer<typeof registerCredentialsSchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
