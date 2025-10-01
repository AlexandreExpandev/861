import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './context';
import { authService } from '@/domain/auth/services/authService';
import type { AuthContextValue, User, LoginCredentials } from './types';
import { api } from '@/core/lib/api';

/**
 * @component AuthProvider
 * @summary Provides authentication state and actions to the entire application.
 * @domain core
 * @type context-provider
 * @category authentication
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserFromToken = useCallback(async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Here you would typically have an endpoint to verify the token and get user data
      // For this example, we'll assume the token is valid and decode it or fetch user data.
      // Let's simulate fetching user data based on a valid token.
      // In a real app: const userData = await authService.getProfile(); setUser(userData);
      // For now, we'll just mark as authenticated if token exists.
      // A proper implementation would be needed.
      setUser({ id: '1', name: 'Dummy User', email: 'dummy@example.com' }); // Placeholder
    } else {
      delete api.defaults.headers.common['Authorization'];
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadUserFromToken();
  }, [loadUserFromToken]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { user, token } = await authService.login(credentials);
    localStorage.setItem('authToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
