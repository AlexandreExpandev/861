import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';

/**
 * @page RegisterPage
 * @summary Page for new user registration.
 * @domain auth
 * @type form-page
 * @category authentication
 */
export const RegisterPage = () => {
  // Form handling logic will be added here

  return (
    <>
      <Helmet>
        <title>Sign Up - TO DO List</title>
      </Helmet>
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create an Account</h1>
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/auth/login" className="font-medium text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input type="text" id="name" name="name" required className="mt-1" />
          </div>
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
            Create Account
          </Button>
        </form>
      </div>
    </>
  );
};
