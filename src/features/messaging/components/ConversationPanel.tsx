import { useEffect, useReducer, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './ConversationPanel.css';
import apiClient, { getApiAssetUrl, getApiUrl } from '../../../lib/api-client';
import { formatFrenchDateTime } from '../../../lib/date-format';
import type { Member } from '../../members/member.types';
import type { Message as ChatMessage } from '../message.types';

type MembersState = {
  loading: boolean;
  error: string;
  members: Member[];
};

type MembersAction =
  | { type: 'FETCH_MEMBERS_SUCCESS'; payload: Member[] }
  | { type: 'FETCH_MEMBERS_ERROR' };

type MessagesState = {
  loading: boolean;
  error: string;
  messages: ChatMessage[];
};

type MessagesAction =
  { type: 'FETCH_SUCCESS'; payload: ChatMessage[] } | { type: 'FETCH_ERROR' };

function ConversationPanel() {
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

  const initialMembersState: MembersState = {
    loading: true,
    error: '',
    members: [],
  };

  const membersReducer = (
    state: MembersState,
    action: MembersAction
  ): MembersState => {
    switch (action.type) {
      case 'FETCH_MEMBERS_SUCCESS':
        return {
          ...state,
          loading: false,
          members: action.payload,
          error: '',
        };
      case 'FETCH_MEMBERS_ERROR':
        return {
          ...state,
          loading: false,
          members: [],
          error: 'Something went wrong with members!',
        };
      default:
        return state;
    }
  };

  const [membersState, membersDispatch] = useReducer(
    membersReducer,
    initialMembersState
  );

  useEffect(() => {
    apiClient
      .get<Member[]>('/memberinfos', { withCredentials: true })
      .then((response) => {
        membersDispatch({
          type: 'FETCH_MEMBERS_SUCCESS',
          payload: response.data,
        });
      })
      .catch(() => {
        membersDispatch({ type: 'FETCH_MEMBERS_ERROR' });
      });
  }, []);

  const initialState: MessagesState = {
    loading: true,
    error: '',
    messages: [],
  };

  const reducer = (
    state: MessagesState,
    action: MessagesAction
  ): MessagesState => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          ...state,
          loading: false,
          messages: action.payload,
          error: '',
        };
      case 'FETCH_ERROR':
        return {
          ...state,
          loading: false,
          messages: [],
          error: 'Something went wrong with messages!',
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    apiClient
      .get<ChatMessage[]>('/messages', { withCredentials: true })
      .then((response) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_ERROR' });
      });
  }, []);

  // Trier les messages par date (du plus récent au plus ancien)
  const sortedMessages = [...state.messages].sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );

  // Créer un objet pour stocker le dernier message par destinataire
  const lastMessagesByRecipient: Record<string, ChatMessage> = {};

  sortedMessages.forEach((message) => {
    if (userData && userData.email === message.recipient) {
      if (
        !lastMessagesByRecipient[message.sender] ||
        message.datetime > lastMessagesByRecipient[message.sender].datetime
      ) {
        lastMessagesByRecipient[message.sender] = message;
      }
    }
  });

  // Extraire uniquement les derniers messages du tableau d'objets
  const filteredMessages = Object.values(lastMessagesByRecipient);

  const [openReplyDialog, setOpenReplyDialog] = useState(false); // État pour la boîte de dialogue
  const [selectedRecipient, setSelectedRecipient] = useState<string | null>(
    null
  );
  const [messagesWithRecipient, setMessagesWithRecipient] = useState<
    ChatMessage[]
  >([]);

  const handleOpenReplyDialog = (recipient: string) => {
    setSelectedRecipient(recipient);

    // Filtrer les messages entre l'utilisateur actuel et le destinataire sélectionné
    const messages = state.messages.filter(
      (message) =>
        (message.sender === userData.email &&
          message.recipient === recipient) ||
        (message.sender === recipient && message.recipient === userData.email)
    );
    setMessagesWithRecipient(messages);

    setOpenReplyDialog(true);
  };

  const handleCloseReplyDialog = () => {
    setOpenReplyDialog(false);
  };

  return (
    <div>
      <div className="list-group">
        {state.loading || membersState.loading
          ? 'Loading...'
          : filteredMessages.map((message, index) => {
              return (
                <div className="boxMessage rounded mb-4" key={index}>
                  <div className="d-flex align-items-start gap-3 p-3">
                    <div>
                      {membersState.members.map((member) => {
                        if (member.email === message.sender) {
                          return (
                            <div key={member.email}>
                              <img
                                src={getApiAssetUrl(member.imagename)}
                                alt="Membre"
                                className="rounded-circle"
                                width={'70px'}
                              />
                              <h3 className="text-center">
                                {member.firstname} {member.lastname}
                              </h3>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                    <strong>{message.message}</strong>
                  </div>

                  <hr />
                  <div className="text-center">
                    <Button
                      variant="primary"
                      onClick={() => handleOpenReplyDialog(message.sender)}
                      className="m-2"
                    >
                      Répondre
                    </Button>
                  </div>
                </div>
              );
            })}
      </div>

      <Modal show={openReplyDialog} onHide={handleCloseReplyDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Répondre au message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {messagesWithRecipient.map((message, index) => (
            <div
              key={index}
              className={`message-container ${message.sender === userData.email ? 'sent-message' : 'received-message'}`}
            >
              <strong>{message.sender}</strong>
              <p>{message.message}</p>
              <small>{formatFrenchDateTime(message.datetime)}</small>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <form
            className="form-message"
            action={getApiUrl('/messages')}
            method="post"
          >
            <input
              type="hidden"
              name="memberId"
              className="form-control "
              value={userData.id || ''}
              readOnly
            />
            <input
              type="hidden"
              name="sender"
              value={userData.email || ''}
              readOnly
            />
            <input
              type="hidden"
              name="recipient"
              value={selectedRecipient || ''}
              readOnly
            />
            <label className="form-label" htmlFor="reply-message">
              Répondre
            </label>
            <textarea
              className="form-control"
              id="reply-message"
              name="message"
              rows={4}
            />
            <Button type="submit" variant="success" className="send-button">
              Envoyer
            </Button>
          </form>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ConversationPanel;
