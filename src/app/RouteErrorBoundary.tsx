import { Component, ErrorInfo, ReactNode } from 'react';

type RouteErrorBoundaryState = {
  error: Error | null;
};

class RouteErrorBoundary extends Component<
  { children: ReactNode },
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = {
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Erreur de rendu route', error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <main className="container">
          <div role="alert">
            <strong>Impossible d&apos;afficher cette page.</strong>
            <p>{this.state.error.message}</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
