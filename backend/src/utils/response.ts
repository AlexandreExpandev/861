/**
 * @summary Standard success response format
 * @param data Response data
 * @param metadata Optional metadata
 */
export function successResponse<T>(data: T, metadata?: Record<string, any>) {
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
 * @summary Standard error response format
 * @param message Error message
 * @param details Optional error details
 */
export function errorResponse(message: string, details?: any) {
  return {
    success: false,
    error: {
      message,
      details,
    },
    timestamp: new Date().toISOString(),
  };
}
