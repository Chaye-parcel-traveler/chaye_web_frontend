
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
import Maps from './Components/Maps/Maps';
import Announcements from './Components/Announcements/Announcements';
import Comments from './Components/Comments/Comments';
import Message from './Components/Message/Message';


function App() {


  return (
    <div className="App">
      <div className="vw-100 vh-100 row ">
        <div className="col-2 vh-100">
          <Navbar />
        </div>
        <div className="col-10">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='/allmembers' element={<AllMembers />} />
            <Route path='/editmember/:id' element={<EditMember />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/AddPackage' element={<AddPackage />} />
            <Route path='/EditPackage/:id' element={<EditPackage />} />
            <Route path='/announcements' element={<Announcements />} />
            <Route path='/carte' element={<Maps />}/>
            <Route path='/comment' element={<Comments />}/>
            <Route path='/message' element={<Message />}/>
          </Routes>
        </div>
      </div>


    </div>
  );
}

export default App;
