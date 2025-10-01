import { LoginCredentials, LoginResponse, User } from '@/domain/auth/types';

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export type { User, LoginCredentials, LoginResponse };
