/**
 * @summary User entity interface
 */
export interface UserEntity {
  idUser: number;
  name: string;
  email: string;
  password: string;
  dateCreated: Date;
  dateModified?: Date;
  active: boolean;
}

/**
 * @summary Parameters for user registration
 */
export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

/**
 * @summary Parameters for user login
 */
export interface LoginParams {
  email: string;
  password: string;
}

/**
 * @summary Authentication result
 */
export interface AuthResult {
  user: {
    idUser: number;
    name: string;
    email: string;
  };
  token: string;
}
