import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/profile.css';
import Header from '../Header/Header';
import AllMessages from '../Message/AllMessages';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate()
  // État pour le chargement
  const [loading, setLoading] = useState(true);
  // État pour les erreurs
  const [error, setError] = useState('');
  // État pour les données des membres
  const [member, setMember] = useState({});

  useEffect(() => {
    axios
      .get('/me')
      .then((response) => {
        setLoading(false);
        setError('');
        setMember(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setError('Something went wrong!');
        setMember({});
        navigate('/loginSignup')
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
      <div className="content-body">
        <Header />
        <React.Fragment>
          <div className="content-main">
            <div className='content-profile'>
              <div className='message'>
                <h1 className='fw-bold m-3'>Mes messages </h1>
                <hr className='tri-ligne mx-4'/>
                <AllMessages/>
              </div>
              <div className='profile'>
                <div className='img-profile'>
                  <img src={`/${member.imagename}`} className='rounded-circle' width={'120px'} height={'100px'} alt='toto' />
                </div>
                <h1>{member.lastname} {member.firstname}</h1>
                <p><i className="fa-solid fa-location-dot"></i>{member.adress}</p>
                <hr />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                <hr />

                <h3>Contact info</h3>
                <span>  <i className="fa-regular fa-envelope"></i> Email : {member.email}</span><br /><br />
                <span> <i className="fa-solid fa-phone"></i>Phone : {member.phone}</span><br /><br />
                <a className="py-3 m-3" href={`/editmember/${member._id}`}><br />
                  <i className="fas fa-pencil-alt"></i> Modifier mes informations
                </a>

                <form action={`/members/${member._id}?_method=DELETE`} method='post'>
                  <input type='hidden' name='_method' value='DELETE' />
                  <button className="btn btn-danger m-3" type="submit" >
                    <i className="fas fa-trash "></i>Supprimer mon compte
                  </button>
                </form>
                <br />
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    </div>
  )
}

export default Profile;
