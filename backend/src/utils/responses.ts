/**
 * @summary
 * Standard success response format
 *
 * @param data Response data
 * @param metadata Optional metadata
 * @returns Formatted success response
 */
export function successResponse<T>(
  data: T,
  metadata?: any
): {
  success: true;
  data: T;
  metadata?: any;
} {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * @summary
 * Standard error response format
 *
 * @param message Error message
 * @param code Error code
 * @param details Error details
 * @returns Formatted error response
 */
export function errorResponse(
  message: string,
  code: string = 'INTERNAL_SERVER_ERROR',
  details?: any
): {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
} {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}
