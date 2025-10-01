import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/core/components/Button';

/**
 * @page HomePage
 * @summary The public landing page for the application.
 * @domain public
 * @type public-page
 * @category marketing
 */
export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Welcome - TO DO List</title>
      </Helmet>
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">TO DO List</h1>
          <p className="mt-2 text-lg text-gray-600">Organize your life, one task at a time.</p>
          <div className="mt-6 space-x-4">
            <Button asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link to="/auth/register">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
