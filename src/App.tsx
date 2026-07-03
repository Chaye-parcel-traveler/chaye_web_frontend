import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import SenderFormular from './components/SendFormular/SenderFormular';
import CarrierFormular from './components/CarrierFormular';
import Announces from './components/Announces';
import ProfileManager from './components/ProfileManager';
import AdminModeration from './components/AdminModeration';
import AccountStatusNotice from './components/AccountStatusNotice';

function App() {
  return (
    <>
      <Navigation />
      <AccountStatusNotice />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrier" element={<CarrierFormular />} />
          <Route path="/sender" element={<SenderFormular />} />
          <Route path="/annonces" element={<Announces />} />
          <Route path="/profil" element={<ProfileManager />} />
          <Route path="/admin" element={<AdminModeration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
