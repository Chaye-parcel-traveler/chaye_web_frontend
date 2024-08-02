import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profil" element={<ProfilManager />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
