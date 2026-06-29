import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import apiClient from '../../../lib/api-client';
import type { Member } from '../../members/member.types';

type MessageFormProps = {
  recipient: string;
};

function MessageForm({ recipient }: MessageFormProps) {
  let navigate = useNavigate();
  const [userData, setUserData] = useState<Partial<Member>>({});
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('recipient', recipient);
    formData.append('message', message);
    apiClient
      .post(`/messages`, formData, { withCredentials: true })
      .then(() => {
        return navigate('/');
      })
      .catch(() => {
        setUserData({});
      });
  };

  const handelMessageChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  return (
    <div>
      {' '}
      {/* Ajoutez un élément parent */}
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
              <input
                type="hidden"
                name="sender"
                value={userData.email || ''}
                readOnly
              />
              <input
                type="hidden"
                name="recipient"
                value={recipient || ''}
                readOnly
              />
              <input
                type="hidden"
                name="memberId"
                value={userData.id || ''}
                readOnly
              />
              <div>
                <label htmlFor="texte" className="fst-italic">
                  Message:
                </label>
                <textarea
                  name="message"
                  className="form-control"
                  rows={4}
                  onChange={handelMessageChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary fst-italic mt-2 mx-2"
              >
                Envoyer
              </button>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="sumau" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MessageForm;
