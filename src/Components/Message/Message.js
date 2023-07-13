import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from "react-router-dom";
const Date = moment().format('YYYY-MM-DD');

function Message() {
    let navigate = useNavigate();
  const [recipient, setRecipient] = useState('');
  const [message, setMessage] = useState('');
  const handelMessage = (event) => {
    setMessage(event.target.value);
  };

  const handelRecipient = (event) => {
    setRecipient(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('recipient', recipient);
    formData.append('message', message);
    axios
      .post(`/messages`, formData ,{withCredentials:true})
      .then((response) => {
        console.log(response.data);
        return navigate('/home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="container col-6">
        <h1 className="text-center">Nouveau message</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="fst-italic">email de destinataire</label>
            <input type="text" className="form-control" id="recipient"  name="recipient"  value={recipient} onChange={handelRecipient} />
          </div>
          <div className="form-group">
            <label className="fst-italic">Message</label>
            <textarea className="form-control" id="message" name="message"  rows="4" value={message}  onChange={handelMessage}></textarea>
          </div>
          <input type="hidden" name="datetime" id="datetime" value={Date} />
          <button type="submit" className="btn btn-primary mt-2">Envoyer</button>
        </form>
      </div>
    </div>
  );
}

export default Message;
