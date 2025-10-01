/**
 * @summary
 * Security utility functions for the application
 */

/**
 * @summary
 * Sanitizes user input to prevent XSS attacks
 *
 * @param input The user input to sanitize
 * @returns Sanitized string
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';

  // Replace potentially dangerous characters with HTML entities
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}
