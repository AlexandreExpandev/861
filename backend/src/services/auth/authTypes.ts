/**
 * @summary
 * User entity interface
 */
export interface User {
  id: number;
  name: string;
  email: string;
}

/**
 * @summary
 * JWT payload structure
 */
export interface UserPayload {
  id: number;
  name: string;
  email: string;
}

/**
 * @summary
 * Login request parameters
 */
export interface LoginParams {
  email: string;
  password: string;
}

/**
 * @summary
 * Login result interface
 */
export interface LoginResult {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
}

/**
 * @summary
 * Registration request parameters
 */
export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

/**
 * @summary
 * Registration result interface
 */
export interface RegisterResult {
  success: boolean;
  user?: User;
  message?: string;
}
