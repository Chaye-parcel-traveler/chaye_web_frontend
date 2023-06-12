
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Inscription from './Components/User/Inscription';
import Connexion from './Components/User/Connexion';
import Navbar from './Components/NavBar/NavBar';
import AllMembres from './Components/User/AllMembres';
import EditMembre from './Components/User/EditMembre';
import Deconnecter from './Components/User/Deconnecter';
import Profile from './Components/User/Profile';
import Accueil from './Components/Accueil/Accueil';
import AjoutColis from './Components/Colis/AjoutColis';

function App() {
  return (
    <div className="App">
    <Navbar/>
  <Routes>
    <Route path='/accueil' element={<Accueil/>}/>
    <Route path='/inscription' element={<Inscription/>}/>
    <Route path='/connexion' element={<Connexion />}/>
    <Route path='/allmembres' element={<AllMembres />}/>
    <Route path='/editmembre/:id' element={<EditMembre/>}/>
    <Route path='/deconnecter' element={<Deconnecter/>}/>
    <Route path='/profile/:id' element={<Profile/>}/>
    <Route path='/ajoutcolis' element={<AjoutColis/>}/>
  </Routes>
    </div>
  );
}

export default App;
