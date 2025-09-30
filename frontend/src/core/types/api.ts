/**
 * @type ApiResponse
 * @summary Generic type for a successful API response from the backend.
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
}

/**
 * @type ApiErrorResponse
 * @summary Generic type for a failed API response from the backend.
 */
export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: { path: (string | number)[]; message: string }[];
}
