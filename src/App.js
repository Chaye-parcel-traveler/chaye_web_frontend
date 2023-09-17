
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './Components/Member/SignUp';
import Login from './Components/Member/Login';
import AllMembers from './Components/Member/AllMembers';
import EditMember from './Components/Member/EditMember';
import Profile from './Components/Member/Profile';
import Home from './Components/Home/Home';
import AddPackage from './Components/Package/AddPackage';
import EditPackage from './Components/Package/EditPackage';
import Maps from './Components/Maps/Maps';
import Announcements from './Components/Announcements/Announcements';
import AddAnnouncements from './Components/Announcements/AddAnnouncements';
import Comments from './Components/Comments/Comments';
import AboutUs from './Components/AboutUs/AboutUs';
import Support from './Components/Support/Support';
import Faq from './Components/Support/Faq';
// import Message from './Components/Message/Message';


function App() {
  return (
    <div className="App ">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/allmembers' element={<AllMembers />} />
          <Route path='/editmember/:id' element={<EditMember />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/AddPackage' element={<AddPackage />} />
          <Route path='/EditPackage/:id' element={<EditPackage />}/>
          <Route path='/announcements' element={<Announcements />}/>
          <Route path='/AddAnnouncements' element={<AddAnnouncements />} />
          <Route path='/comment' element={<Comments />} />
          <Route path='/AboutUs' element={<AboutUs/>} />
          <Route path='/support' element={<Support/>} />
          <Route path='/faq' element={<Faq/>} />
          <Route path='/carte' element={<Maps/>} />
          {/* <Route path='/message' element={<Message />} /> */}
        </Routes>
      </div>
  );
}

export default App;
