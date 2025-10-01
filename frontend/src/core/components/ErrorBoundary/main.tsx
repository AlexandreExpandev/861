import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * @component ErrorBoundary
 * @summary A React component that catches JavaScript errors anywhere in its child component tree and displays a fallback UI.
 * @type utility-component
 * @category core
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    // You can also log the error to an error reporting service
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-800">
            <h1 className="text-2xl font-bold">Something went wrong.</h1>
            <p className="mt-2">Please try refreshing the page.</p>
            <button
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Refresh
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
