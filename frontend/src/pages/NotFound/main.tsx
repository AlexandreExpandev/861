import { Link } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary A page displayed when a route is not found (404).
 * @domain core
 * @type error-page
 * @category navigation
 */
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl mt-4 text-gray-600">Page Not Found</p>
      <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
};
