import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import '../styles/comment.css';
import apiClient, { getApiUrl } from '../../lib/api';
import type { Member } from '../../types/entities';

type FormCommentProps = {
  announcementId: number | string;
};

function FormComment({ announcementId }: FormCommentProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userData, setUserData] = useState<Partial<Member>>({});

  useEffect(() => {
    apiClient
      .get<Member>('/me')
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {
        setUserData({});
      });
  }, []);
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Commenter
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Commentaires</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action={getApiUrl('/comments')} method="post">
            <input
              type="hidden"
              name="memberId"
              className="form-control"
              value={userData.id || ''}
              readOnly
            />
            <input
              type="hidden"
              name="announcementId"
              className="form-control"
              value={announcementId}
              readOnly
            />
            <label>Notez notre site</label>
            <Stack spacing={1}>
              <Rating
                name="ratingStars"
                defaultValue={1}
                precision={0.5}
                size="large"
              />
            </Stack>
            <div className="comment">
              <h3>Laissez un commentaire :</h3>
              <textarea id="commentText" name="content" />
            </div>
            <Button className="sumau" type="submit">
              Soumettre
            </Button>
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

export default FormComment;
