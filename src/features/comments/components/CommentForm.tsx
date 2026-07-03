import { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './CommentForm.css';
import StarRating from '../../../components/StarRating';
import apiClient, { getApiUrl } from '../../../lib/api-client';
import type { Member } from '../../members/member.types';

type CommentFormProps = {
  announcementId: number | string;
};

function CommentForm({ announcementId }: CommentFormProps) {
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
      <Modal
        animation={import.meta.env.MODE !== 'test'}
        aria-labelledby="comment-dialog-title"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton closeLabel="Fermer">
          <Modal.Title id="comment-dialog-title">Commentaires</Modal.Title>
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
            <label htmlFor="ratingStars">Notez notre site</label>
            <StarRating name="ratingStars" />
            <div className="comment">
              <label className="h3" htmlFor="commentText">
                Laissez un commentaire :
              </label>
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

export default CommentForm;
