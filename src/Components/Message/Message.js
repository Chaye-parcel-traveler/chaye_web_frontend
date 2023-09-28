import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap'; 

function Message({ recipient }) {
  const [userData, setUserData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
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
    return <p>Loading...</p>;
  }

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
          <form action="http://localhost:5000/messages" method="post">
            <div className="form-group col-8 m-auto">
              <input type="hidden" name="sender" value={userData.email} />
              <input type="hidden" name="recipient" value={recipient} />
              <input type="hidden" name="memberId" value={userData.id} />
              <div>
                <label htmlFor="texte" className="fst-italic">Message:</label>
                <textarea name="message" className="form-control" rows="4" />
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
