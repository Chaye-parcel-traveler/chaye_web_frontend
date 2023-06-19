import axios from 'axios';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import moment from 'moment/moment' ;
import 'moment/locale/fr';
const socket = io('http://localhost:5000'); // Création de l'instance du socket.io
//Moment (date)
moment().locale('fr');
function ChatApp() {
  const [message, setMessage] = useState(''); // État pour stocker le message en cours de saisie
  const [messages, setMessages] = useState([]); // État pour stocker la liste des messages

  useEffect(() => {
    // Écoute de l'événement 'message' du socket
    socket.on('message', (data) => {
      // Ajout du nouveau message à la liste des messages
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Appel à la fonction fetchMessages pour récupérer les messages existants
    fetchMessages();

    return () => {
      // Désinscription de l'événement 'message' du socket
      socket.off('message');
    };
  }, []);

  const fetchMessages = () => {
    // Appel à l'API pour récupérer tous les messages
    axios
      .get('http://localhost:5000/allchat')
      .then((response) => {
        // Mise à jour de la liste des messages avec les données reçues de l'API
        setMessages(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessage = (e) => {
    e.preventDefault();
    // Émission de l'événement 'message' du socket avec le contenu du message
    socket.emit('message', message);
    // Réinitialisation du champ de saisie du message
    setMessage('');
  };

  return (
    <React.Fragment>
      <ul>
        {messages.map((msg, index) => (
          <div key={index}>
            <h3>{msg.contenu}</h3>
            <p>{moment(msg.date_envoi).format('LLL')}</p>
          </div>
        ))}
      </ul>

      <form onSubmit={sendMessage}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </React.Fragment>
  );
}

export default ChatApp;
