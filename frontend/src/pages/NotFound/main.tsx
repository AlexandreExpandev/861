import { Link } from 'react-router-dom';
import { Button } from '@/core/components/Button';

/**
 * @page NotFoundPage
 * @summary A 404 error page for routes that do not exist.
 * @type error-page
 */
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link to="/">
        <Button>Go to Homepage</Button>
      </Link>
    </div>
  );
};
