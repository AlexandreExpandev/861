import api from '@/core/lib/api';
import { LoginCredentials, LoginResponse, User } from '../types';

/**
 * @service authService
 * @summary Provides methods for authentication-related API calls.
 * @domain auth
 * @type api-service
 */
export const authService = {
  /**
   * @summary Logs in a user.
   * @param {LoginCredentials} credentials - The user's email and password.
   * @returns {Promise<LoginResponse>} The login response containing token and user data.
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post('/external/auth/login', credentials);
    return response.data.data;
  },

  // register handler can be added here if needed
};
