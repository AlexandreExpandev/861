import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/core/lib/queryClient';
import { AuthProvider } from '@/core/contexts/auth';

/**
 * @component AppProviders
 * @summary A component that wraps the entire application with necessary context providers.
 * @type utility-component
 * @category core
 */
export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
