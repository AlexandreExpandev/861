import { z } from 'zod';

/**
 * @summary Common validation utilities
 */

// String validations
export const zString = z.string();
export const zName = z.string().min(1).max(100);
export const zEmail = z.string().email().max(100);
export const zPassword = z.string().min(8).max(100);
export const zDescription = z.string().max(500);

// Number validations
export const zId = z.number().int().positive();
export const zPriority = z.number().int().min(0).max(2);

// Date validations
export const zDateString = z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'Invalid date format'
});

// Boolean validations
export const zBoolean = z.boolean();

// Optional fields
export const zNullableString = z.string().nullable().optional();
export const zNullableDescription = z.string().max(500).nullable().optional();
export const zNullableDate = z.date().nullable().optional();

/**
 * @summary Sanitize input to prevent XSS attacks
 * @param {string} input - The input to sanitize
 * @returns {string} The sanitized input
 */
export function sanitizeInput(input: string): string {
  if (!input) return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')\n    .replace(/\//g, '&#x2F;');
}
