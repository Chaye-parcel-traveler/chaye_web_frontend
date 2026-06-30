import AppProviders from './providers';
import AppRouter from './router';

function App() {
  return (
    <AppProviders>
      <div className="App">
        <AppRouter />
      </div>
    </AppProviders>
  );
}

export default App;
