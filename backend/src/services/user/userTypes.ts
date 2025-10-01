/**
 * @interface User
 * @description Represents a user entity in the system
 */
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface UserWithToken
 * @description User with authentication token
 */
export interface UserWithToken {
  id: number;
  name: string;
  email: string;
  token: string;
}

/**
 * @interface JwtPayload
 * @description JWT token payload structure
 */
export interface JwtPayload {
  id: number;
  iat?: number;
  exp?: number;
}
