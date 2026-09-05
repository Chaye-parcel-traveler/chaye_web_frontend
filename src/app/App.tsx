import { BrowserRouter } from 'react-router-dom';
import AppProviders from './providers';
import RouteErrorBoundary from './RouteErrorBoundary';
import AppRouter from './router';

function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <RouteErrorBoundary>
          <AppRouter />
        </RouteErrorBoundary>
      </BrowserRouter>
    </AppProviders>
  );
}

export default App;
