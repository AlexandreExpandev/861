import { useState, useEffect, ReactNode, useCallback } from 'react';
import { AuthContext } from './context';
import { authService } from '@/domain/auth/services/authService';
import type { User, AuthContextValue, LoginCredentials } from './types';
import { api } from '@/core/lib/api';

/**
 * @component AuthProvider
 * @summary Provides authentication context to the application.
 * @domain core
 * @type context-provider
 * @category authentication
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        // Here you would typically validate the token with the backend.
        // For this example, we'll assume the token is valid if it exists
        // and decode it to get user info (in a real app, fetch user profile).
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // const userData = await authService.getProfile(); // Example call
        // For now, we'll just set a placeholder user
        setUser({ id: '1', name: 'Authenticated User', email: 'user@example.com' });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Authentication check failed', error);
      setUser(null);
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials: LoginCredentials) => {
    const { token, user: userData } = await authService.login(credentials);
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
