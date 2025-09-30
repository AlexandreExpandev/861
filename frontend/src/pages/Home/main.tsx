import { Link } from 'react-router-dom';

/**
 * @page HomePage
 * @summary The public landing page for the application.
 * @domain core
 * @type public-page
 * @category public
 */
export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">TO DO List System</h1>
      <p className="text-lg text-gray-600 mb-8">Organize your life, one task at a time.</p>
      <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Get Started
      </Link>
    </div>
  );
};
