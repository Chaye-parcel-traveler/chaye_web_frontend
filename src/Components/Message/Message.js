// Dialogue.js
import React, { useEffect, useState } from 'react';

const Dialogue = ({ email, member }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fonction pour récupérer les messages du backend
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?email=${email}`);
        const data = await response.json();
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.log('Error retrieving messages:', error);
        setLoading(false);
      }
    };

    fetchMessages();
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Chat with {email}</h1>

      <h2>Sent Messages:</h2>
      <ul>
        {messages
          .filter(message => message.sender === member.email)
          .map(message => (
            <li key={message._id}>{message.message}</li>
          ))}
      </ul>

      <h2>Received Messages:</h2>
      <ul>
        {messages
          .filter(message => message.recipient === member.email)
          .map(message => (
            <li key={message._id}>{message.message}</li>
          ))}
      </ul>

      <h2>Contact Messages:</h2>
      <ul>
        {messages
          .filter(message => message.recipient === member.email || message.sender === member.email)
          .map(message => (
            <li key={message._id}>{message.message}</li>
          ))}
      </ul>

      <h2>All Messages:</h2>
      <ul>
        {messages.map(message => (
          <li key={message._id}>{message.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dialogue;
