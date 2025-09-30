import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '@/core/lib/queryClient';
import { AuthProvider } from '@/core/contexts/auth';
import { AppRouter } from './router';

/**
 * @component AppProviders
 * @summary A component that wraps the entire application with necessary context providers.
 * @domain core
 * @type ui-component
 * @category provider
 */
export const AppProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
        <Toaster position="bottom-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
};
