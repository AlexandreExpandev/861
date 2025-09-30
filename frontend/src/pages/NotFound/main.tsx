import { Link } from 'react-router-dom';

/**
 * @page NotFoundPage
 * @summary A 404 Not Found page for non-existent routes.
 * @domain core
 * @type utility-page
 * @category error-handling
 */
export const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl font-medium text-gray-600 mt-4">Page Not Found</p>
      <p className="text-gray-500 mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Go to Homepage
      </Link>
    </div>
  );
};
