import { api } from '@/core/lib/api';
import type { LoginCredentials, LoginResponse, RegisterCredentials, User } from '../types';

/**
 * @service authService
 * @summary Provides methods for user authentication API calls.
 * @domain auth
 * @type api-service
 */
export const authService = {
  /**
   * @endpoint POST /external/auth/login
   * @summary Logs a user in.
   */
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return api.post('/external/auth/login', credentials);
  },

  /**
   * @endpoint POST /external/auth/register
   * @summary Registers a new user.
   */
  register: async (credentials: RegisterCredentials): Promise<User> => {
    return api.post('/external/auth/register', credentials);
  },
};
