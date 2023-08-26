import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Message() {
  const [userData, setUserData] = useState({}); // Initialisez avec un objet vide

  useEffect(() => {
    axios.get('http://localhost:5000/getConnectedUser', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        setUserData(false);
      });
  }, []);

  if (!userData) {
    return <p>Loading...</p>; // Condition de rendu conditionnelle
  }

  return (
    <form action="http://localhost:5000/messages" method="post">
    
    <div className="form-group col-8 m-auto">
      <input type="hidden" name="sender" value={userData.email} />
      <div>
        <label For="recipient" className="fst-italic">Destinataire</label>
        <input className="form-control" type="text" name="recipient" />
      </div>
      <div>
        <label For="texte" className="fst-italic">Message:</label>
        <textarea name="message" className="form-control" rows="4" />
      </div>
      <button type="submit" className="btn btn-primary fst-italic mt-2 mx-2">Envoyer</button>
      </div>
    </form>
  );
}

export default Message;
