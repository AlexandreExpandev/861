import { useContext } from 'react';
import { AuthContext } from './context';

/**
 * @hook useAuth
 * @summary A custom hook to access the authentication context.
 * @type utility-hook
 * @category authentication
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
