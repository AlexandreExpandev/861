import { api } from '@/core/lib/api';
import { LoginCredentials, LoginResponse, RegisterCredentials } from '../types';

/**
 * @service authService
 * @summary Provides methods for authentication-related API operations.
 * @domain auth
 * @type api-service
 */
export const authService = {
  /**
   * @endpoint POST /external/auth/login
   * @summary Logs in a user and returns a token and user data.
   */
  login: (credentials: LoginCredentials): Promise<LoginResponse> => {
    return api.post('/external/auth/login', credentials);
  },

  /**
   * @endpoint POST /external/auth/register
   * @summary Registers a new user.
   */
  register: (data: RegisterCredentials): Promise<LoginResponse> => {
    return api.post('/external/auth/register', data);
  },
};
