
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Inscription from './Components/User/Inscription';
import Connexion from './Components/User/Connexion';
import Navbar from './Components/NavBar/NavBar';
import AllMembres from './Components/User/AllMembres';
import EditMembre from './Components/User/EditMembre';
import Profile from './Components/User/Profile';
import Accueil from './Components/Accueil/Accueil';
import AjoutColis from './Components/Colis/AjoutColis';
import EditColis from './Components/Colis/EditColis';
import ChatApp from './Components/ChatApp/ChatApp';
function App() {


  return (
    <div className="App">

   
    <div className="app">
      <div className="navbar">
        <Navbar/>
      </div>
    <div className="content">
      <Routes>
    <Route path='/accueil' element={<Accueil/>}/>
    <Route path='/inscription' element={<Inscription/>}/>
    <Route path='/connexion' element={<Connexion />}/>
    <Route path='/allmembres' element={<AllMembres />}/>
    <Route path='/editmembre/:id' element={<EditMembre/>}/>
    <Route path='/profile/:id' element={<Profile/>}/>
    <Route path='/ajoutcolis' element={<AjoutColis/>}/>
    <Route path='/editcolis/:id' element={<EditColis/>}/>
    <Route path='/chat' element={<ChatApp/>}/> 
  </Routes>
      </div>
    </div>


    </div>
  );
}

export default App;
