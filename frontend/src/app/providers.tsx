import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from '@/core/contexts/auth';
import { queryClient } from '@/core/lib/queryClient';

/**
 * @component AppProviders
 * @summary A component that composes all global context providers for the application.
 * @type ui-component
 * @category core
 */
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          {children}
          <Toaster position="bottom-right" />
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
