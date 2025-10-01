/**
 * @summary
 * User entity interface
 */
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @summary
 * User registration interface
 */
export interface UserRegister {
  name: string;
  email: string;
  password: string;
}
