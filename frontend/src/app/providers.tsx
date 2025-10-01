import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { queryClient } from '@/core/lib/queryClient';
import { AuthProvider } from '@/core/contexts/auth';

/**
 * @component AppProviders
 * @summary A component that wraps the entire application with necessary context providers.
 * @param {object} props - The component props.
 * @param {ReactNode} props.children - The child components to be rendered.
 */
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
