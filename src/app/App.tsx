import { BrowserRouter } from 'react-router-dom';
import RouteErrorBoundary from './RouteErrorBoundary';
import AppRouter from './router';

function App() {
  return (
    <BrowserRouter>
      <RouteErrorBoundary>
        <AppRouter />
      </RouteErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
