import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SignUp from './Components/Member/SignUp';
import Login from './Components/Member/Login';
import LoginSignup from './Components/Member/LoginSignup';
import AllMembers from './Components/Member/AllMembers';
import EditMember from './Components/Member/EditMember';
import Profile from './Components/Member/Profile';
import Home from './Components/Home/Home';
import AddPackage from './Components/Package/AddPackage';
import EditPackage from './Components/Package/EditPackage';
import Announcements from './Components/Announcements/Announcements';
import { setAuthToken } from './setAuthToken';
import AddAnnouncements from './Components/Announcements/AddAnnouncements';
import AboutUs from './Components/AboutUs/AboutUs';
import Support from './Components/Support/Support';
import Faq from './Components/Support/Faq';
import MentionsLegales from './Components/Footer/MentionsLegales';
import PolitiqueDeConfidentialite from './Components/Footer/PolitiqueDeConfidentialite';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import MainLayout from './Components/MainLayout';
// import Message from './Components/Message/Message';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
console.log('process.env', process.env)

//check jwt token
const token = sessionStorage.getItem("token");
setAuthToken(token);

function App() {

  /*const [currentUser, setCurrentUser] = useState();
  useEffect(async () => {
    if(!currentUser && token){
      const me = await axios.get('/me')
      setCurrentUser(me)
    }
  })*/

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true
    });
  })

  return (
    <GoogleOAuthProvider clientId="871900328667-bq9ic36okos7jmctp2kc00f5q9q8bv5l.apps.googleusercontent.com">

      <div className="App">
        <Routes layout={<MainLayout />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/allmembers' element={<AllMembers />} />
            <Route path='/editmember/:id' element={<EditMember />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/AddPackage' element={<AddPackage />} />
            <Route path='/EditPackage/:id' element={<EditPackage />} />
            <Route path='/announcements' element={<Announcements />} />
            <Route path='/AddAnnouncements' element={<AddAnnouncements />} />
            <Route path='/AboutUs' element={<AboutUs />} />
            <Route path='/support' element={<Support />} />
            <Route path='/faq' element={<Faq />} />
            <Route path='/mentionlegale' element={<MentionsLegales />} />
            <Route path='/politiqueDeConfidentialite' element={<PolitiqueDeConfidentialite />} />
          </Route>
          <Route path='/loginSignup' element={<LoginSignup />} />
          {/* <Route path='/message' element={<Message />} /> */}
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
