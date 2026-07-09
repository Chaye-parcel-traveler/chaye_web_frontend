import { Component, ErrorInfo, lazy, ReactNode, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import SenderFormular from './components/SendFormular/SenderFormular';
import Announces from './components/Announces';
import ProfileManager from './components/ProfileManager';
import ProfileAnnouncements from './components/ProfileAnnouncements';
import AdminModeration from './components/AdminModeration';
import AccountStatusNotice from './components/AccountStatusNotice';
import MessagesList from './components/MessagesList';
import MessageThread from './components/MessageThread';

const CarrierFormular = lazy(() => import('./components/CarrierFormular'));

function App() {
  return (
    <Router>
      <Navigation />
      <AccountStatusNotice />
      <RouteErrorBoundary>
        <Suspense fallback={<main className="container">Chargement...</main>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/carrier" element={<CarrierFormular />} />
            <Route path="/sender" element={<SenderFormular />} />
            <Route path="/annonces" element={<Announces />} />
            <Route path="/profil" element={<ProfileManager />} />
            <Route path="/profil/annonces" element={<ProfileAnnouncements />} />
            <Route path="/profil/messages" element={<MessagesList />} />
            <Route
              path="/profil/messages/:discussionId"
              element={<MessageThread />}
            />
            <Route path="/admin" element={<AdminModeration />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </Router>
  );
}

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
            <strong>Impossible d’afficher cette page.</strong>
            <p>{this.state.error.message}</p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default App;
