import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';

/**
 * @page LoginPage
 * @summary Page for user login.
 * @domain auth
 * @type form-page
 * @category authentication
 */
export const LoginPage = () => {
  // Form handling logic will be added here

  return (
    <>
      <Helmet>
        <title>Login - TO DO List</title>
      </Helmet>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In</h1>
          <p className="text-gray-500">
            Don't have an account?{' '}
            <Link to="/auth/register" className="font-medium text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input type="email" id="email" name="email" required className="mt-1" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input type="password" id="password" name="password" required className="mt-1" />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </div>
    </>
  );
};
