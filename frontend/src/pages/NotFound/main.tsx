import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/core/components/Button';

/**
 * @page NotFoundPage
 * @summary A 404 Not Found page for invalid routes.
 * @domain core
 * @type error-page
 * @category navigation
 */
export const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="flex min-h-screen flex-col items-center justify-center text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl text-gray-600">Page Not Found</p>
        <Button asChild className="mt-6">
          <Link to="/">Go Home</Link>
        </Button>
      </div>
    </>
  );
};
