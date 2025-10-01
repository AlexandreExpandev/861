import { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from './context';
import { User, LoginCredentials } from '@/domain/auth/types';
import { authService } from '@/domain/auth/services/authService';
import { jwtDecode } from 'jwt-decode';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded: { exp: number; user: User } = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded.user);
        } else {
          localStorage.removeItem('authToken');
        }
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('authToken');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials: LoginCredentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem('authToken', token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
