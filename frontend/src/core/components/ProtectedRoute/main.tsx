import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';

/**
 * @component ProtectedRoute
 * @summary A wrapper component that protects routes requiring authentication.
 * @type utility-component
 * @category navigation
 */
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
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
