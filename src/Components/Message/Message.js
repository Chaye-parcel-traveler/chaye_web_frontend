import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
function Message() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Faites une requête pour obtenir le token JWT depuis le serveur
    const fetchToken = async () => {
      try {
        const response = await axios.get('/login'); 
        const token = response.data.token; 

        // Déchiffrez le token pour obtenir les informations
        const decodedToken = jwt_decode(token);
        const id = decodedToken.id; 

        setUserId(id);
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    fetchToken();
  }, []);

  return (
    <form action="http://localhost:5000/messages" method="post">
      <div>
        <label for="recipient">Destinataire:</label>
        <input className='formul-control' type="text" name="recipient" />
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea name="message" />
      </div>
      <button type="submit">Envoyer</button>
      <Link to={`/profile/${userId}`}>
        Voir le profil de l'utilisateur
      </Link>
    </form>
    
     
    
  );
}

export default Message;
