import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import SenderFormular from './components/SendFormular/SenderFormular';
import CarrierFormular from './components/CarrierFormular';

function App() {
  return (
    <>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrier" element={<CarrierFormular />} />
          <Route path="/sender" element={<SenderFormular />} />
          {/* <Route path="/profil" element={<ProfilManager />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
