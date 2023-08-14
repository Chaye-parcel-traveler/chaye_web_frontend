import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import '../styles/accueil.css';
import '../styles/nav.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

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
      .get(`http://localhost:5000/members/${params.id}`, { withCredentials: true })
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
        <div className="assurance">
          <h4>Assurance</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste labore magni repudiandae et,
            eum
            deleniti quaerat nobis nemo aut praesentium adipisci facere? Quos, impedit nobis quisquam in harum
            perspiciatis!...</p><a href="">Lire la suite</a>
        </div>
        <React.Fragment>
          <img src={`http://localhost:5000/${member.imagename}`} width={'150px'} />
          <h1>{member.lastname}</h1>
          <h1>{member.firstname}</h1>
          <h1>{member.email}</h1>
          <h1>{member.adress}</h1>
          <Button primary as='a' href={`/editmember/${member._id}`}>
            Edit
          </Button>
          <form action={`http://localhost:5000/members/${member._id}?_method=DELETE`} method='post'>
            <input type='hidden' name='_method' value='DELETE' />
            <Button positive type='submit'>Supprimer</Button>
          </form>
        </React.Fragment>
        <Footer />
      </div>
    </div>
  )
}

export default Profile;
