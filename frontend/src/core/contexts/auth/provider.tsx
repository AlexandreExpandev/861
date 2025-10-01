import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './context';
import { authService } from '@/domain/auth/services/authService';
import { User, AuthProviderProps, LoginCredentials } from './types';
import { api } from '@/core/lib/api';

/**
 * @component AuthProvider
 * @summary Provides authentication state and actions to the application.
 * @type context-provider
 * @category authentication
 */
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserFromToken = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // In a real app, you would validate the token with the backend here
      // For this example, we'll assume the token is valid if it exists
      // and decode it to get user info (this is insecure, for demo only).
      try {
        // const validatedUser = await authService.me();
        // setUser(validatedUser);
        // For now, let's just set a placeholder user
        setUser({ id: '1', name: 'Placeholder User', email: 'user@example.com' });
      } catch (error) {
        console.error('Token validation failed', error);
        localStorage.removeItem('authToken');
      }
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  const login = async (credentials: LoginCredentials) => {
    const { token, user } = await authService.login(credentials);
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
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
