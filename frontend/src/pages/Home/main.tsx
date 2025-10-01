import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/core/contexts/auth';
import { Button } from '@/core/components/Button';

/**
 * @page HomePage
 * @summary The landing page of the application.
 * @type public-page
 */
export const HomePage = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Your TO DO List</h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Stay organized and boost your productivity.
      </p>
      <Link to="/auth/login">
        <Button size="lg">Get Started</Button>
      </Link>
    </div>
  );
};
