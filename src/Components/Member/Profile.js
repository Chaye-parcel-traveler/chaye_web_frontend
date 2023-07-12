import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';

function Profile() {
  const params = useParams();

  // État pour le chargement
  const [loading, setLoading] = useState(true);
  // État pour les erreurs
  const [error, setError] = useState('');
  // État pour les données du membre
  const [membre, setMembre] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/members/${params.id}`,{withCredentials:true})
      .then((response) => {
        setLoading(false);
        setError('');
        setMembre(response.data.membre);
      })
      .catch((error) => {
        setLoading(false);
        setError('Something went wrong!');
        setMembre({});
      });
  }, [params.id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
        <img src={`http://localhost:5000/${membre.imagename}`} width={'150px'}/>
      <h1>{membre.lastname}</h1>
      <h1>{membre.firstname}</h1>
      <h1>{membre.email}</h1>
      <h1>{membre.adress}</h1>
      <Button primary as='a' href={`/editmember/${membre._id}`}>
        Edit
      </Button>
      <form action={`http://localhost:5000/deleteMember/${membre._id}?_method=DELETE`} method='post'>
        <input type='hidden' name='_method' value='DELETE' />
        <Button positive type='submit'>Supprimer</Button>
      </form>
    </div>
  );
}

export default Profile;
