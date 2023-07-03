
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Components/Member/SignUp';
import Login from './Components/Member/Login';
import Navbar from './Components/NavBar/NavBar';
import AllMembers from './Components/Member/AllMembers';
import EditMember from './Components/Member/EditMember';
import Profile from './Components/Member/Profile';
import Home from './Components/Home/Home';
import AddPackage from './Components/Package/AddPackage';
import EditPackage from './Components/Package/EditPackage';
import ChatApp from './Components/ChatApp/ChatApp';
function App() {


  return (
    <div className="App">
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/allmembers' element={<AllMembers />} />
            <Route path='/editmember/:id' element={<EditMember />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/AddPackage' element={<AddPackage />} />
            <Route path='/EditPackage/:id' element={<EditPackage />} />
            <Route path='/chat' element={<ChatApp />} />
          </Routes>
        </div>
      </div>


    </div>
  );
}

export default App;
