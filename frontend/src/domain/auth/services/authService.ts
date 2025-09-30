import { api } from '@/core/lib/api';
import type { ApiResponse } from '@/core/types/api';
import type { LoginCredentials, LoginResponse, User } from '../types';

/**
 * @service authService
 * @summary Provides methods for user authentication.
 * @domain auth
 * @type api-service
 */
export const authService = {
  /**
   * @method login
   * @summary Authenticates a user and returns a token and user data.
   * @param {LoginCredentials} credentials - The user's email and password.
   * @returns {Promise<LoginResponse>} The auth token and user object.
   */
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post<ApiResponse<{ token: string; user: User }>>(
      '/external/auth/login',
      credentials,
    );
    return response.data.data;
  },

  // NOTE: register and getProfile methods would be added here as needed.
};
