import { z } from 'zod';

/**
 * @summary
 * Common Zod validation types for reuse across the application
 */

// String validations
export const zString = z.string().min(1);
export const zNullableString = z.string().nullable();
export const zName = z.string().min(1).max(100);
export const zDescription = z.string().min(1).max(500);
export const zNullableDescription = z.string().max(500).nullable();
export const zEmail = z.string().email();
export const zPassword = z.string().min(6).max(100);

// Number validations
export const zNumber = z.number();
export const zPositiveNumber = z.number().positive();
export const zNonNegativeNumber = z.number().min(0);
export const zFK = z.number().positive().int();
export const zNullableFK = z.number().positive().int().nullable();

// Date validations
export const zDateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const zDateTimeString = z.string().datetime();

// Boolean validations
export const zBit = z.boolean();

// Specialized validations
export const zPriority = z.enum(['low', 'medium', 'high']).default('medium');
export const zStatus = z.enum(['pending', 'in_progress', 'completed']).default('pending');
