import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'; 

function Message({ recipient }) {
  let navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
      .catch(error => {
        setUserData(false);
      });
  }

  const handelMessageChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div> {/* Ajoutez un élément parent */}
      <Button variant="primary" onClick={handleShow}>
       message
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group col-8 m-auto">
              <input type="hidden" name="sender" value={userData.email} />
              <input type="hidden" name="recipient" value={recipient} />
              <input type="hidden" name="memberId" value={userData.id} />
              <div>
                <label htmlFor="texte" className="fst-italic">Message:</label>
                <textarea name="message" className="form-control" rows="4" onChange={handelMessageChange} />
              </div>
              <button type="submit" className="btn btn-primary fst-italic mt-2 mx-2">Envoyer</button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='sumau' onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div> 
  );
}

export default Message;
