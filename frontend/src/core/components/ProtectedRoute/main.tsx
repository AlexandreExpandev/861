import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ReactNode } from 'react';

/**
 * @component ProtectedRoute
 * @summary A component that guards routes requiring authentication.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to render if authenticated.
 */
export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
