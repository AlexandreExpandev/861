/**
 * @type User
 * @summary Represents an authenticated user.
 */
export interface User {
  id: string;
  name: string;
  email: string;
}

/**
 * @type LoginCredentials
 * @summary Credentials required for user login.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * @type LoginResponse
 * @summary Response from a successful login attempt.
 */
export interface LoginResponse {
  token: string;
  user: User;
}

/**
 * @type AuthContextValue
 * @summary The shape of the authentication context value.
 */
export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  logout: () => void;
}
