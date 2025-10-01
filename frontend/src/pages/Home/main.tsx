import { Link } from 'react-router-dom';

/**
 * @page HomePage
 * @summary The public landing page for the application.
 * @domain public
 * @type public-page
 * @category marketing
 */
export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-5xl font-bold mb-4">Welcome to the TO DO List App</h1>
      <p className="text-xl text-gray-700 mb-8">Organize your life, one task at a time.</p>
      <div className="space-x-4">
        <Link
          to="/auth/login"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};
