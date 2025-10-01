import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * @component ErrorBoundary
 * @summary Catches JavaScript errors anywhere in their child component tree and displays a fallback UI.
 * @domain core
 * @type utility-component
 * @category feedback
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
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
            <p className="text-gray-600">Please try refreshing the page.</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}
