/**
 * @type ApiResponse
 * @summary A generic type for the standard API response structure from the backend.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: { path: string; message: string }[];
}
