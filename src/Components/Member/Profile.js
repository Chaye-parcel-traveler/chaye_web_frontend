import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/nav.css';
import '../styles/accueil.css';
import '../styles/profile.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Message from '../Message/Message';
import AllMessages from '../Message/AllMessages';

function Profile() {
  const params = useParams();

  // État pour le chargement
  const [loading, setLoading] = useState(true);
  // État pour les erreurs
  const [error, setError] = useState('');
  // État pour les données des membres
  const [member, setMember] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/member/${params.id}`, { withCredentials: true })
      .then((response) => {
        setLoading(false);
        setError('');
        setMember(response.data.member);
      })
      .catch((error) => {
        setLoading(false);
        setError('Something went wrong!');
        setMember({});
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className='content'>
      <div className='content-menu'>
        <Navbar />
      </div>
      <div className="content-body">
        <Header />
        <React.Fragment>
          <div className="content-main">

            <div className='content-profile'>
              <div className='message'>
                <h1>Mes messages </h1>
                <hr></hr>
                <Message />
                {/* <AllMessages/> */}
              </div>
              <div className='profile'>
                <div className='img-profile'>
                  <img src={`http://localhost:5000/${member.imagename}`} className='rounded-circle' width={'120px'} height={'100px'} />
                </div>
                <h1>{member.lastname} {member.firstname}</h1>
                <p><i class="fa-solid fa-location-dot"></i>{member.adress}</p>
                <hr />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <hr />

                <h3>Contact info</h3>
                <span>  <i class="fa-regular fa-envelope"></i> Email : {member.email}</span><br />
                <span> <i class="fa-solid fa-phone"></i>Phone : {member.phone}</span>
                {/* <Button primary as='a' href={`/editmember/${member._id}`}>
                    Edit
                  </Button>
                  <form action={`http://localhost:5000/members/${member._id}?_method=DELETE`} method='post'>
                    <input type='hidden' name='_method' value='DELETE' />
                    <Button positive type='submit'>Supprimer</Button>
                  </form> */}
              </div>
            </div>
          </div>
        </React.Fragment>
        <Footer />
      </div>
    </div>
  )
}

export default Profile;
