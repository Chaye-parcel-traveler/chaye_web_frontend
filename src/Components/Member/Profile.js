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
  // État pour les données du member
  const [member, setMember] = useState({});

  useEffect((id) => {
    axios
      .get(`/members/${id}`,{withCredentials:true})
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
  }, [params.id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    
    <div>
      {/* <img src={`http://localhost:5000/${member.imagename}`} width={'150px'}/> */}
      <h1>{member.lastname}</h1>
      <h1>{member.firstname}</h1>
      <h1>{member.email}</h1>
      <h1>{member.adress}</h1>
      <Button primary as='a' href={`/editmember/${member._id}`}>
        Edit
      </Button>
      {/* <form action={`http://localhost:5000/deleteMember/${member._id}?_method=DELETE`} method='post'>
        <input type='hidden' name='_method' value='DELETE' /> */}
        <Button positive type='submit'>Supprimer</Button>
      {/* </form> */}
    </div>
  );
}

export default Profile;
