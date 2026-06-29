import React, { useEffect, useReducer, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import moment from 'moment/moment';
import 'moment/locale/fr';
import '../styles/message.css'; // Ajoutez un fichier CSS pour les styles personnalisés
import apiClient, { getApiAssetUrl, getApiUrl } from '../../lib/api';
import type { Member, Message as ChatMessage } from '../../types/entities';

moment().locale('fr');

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

function AllMessages() {
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
      <List sx={{ width: '100%' }}>
        {state.loading || membersState.loading
          ? 'Loading...'
          : filteredMessages.map((message, index) => {
              return (
                <div className="boxMessage rounded mb-4" key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
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
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <React.Fragment>
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              color: 'white',
                              fontSize: '16px',
                            }}
                            component="span"
                            variant="body2"
                          >
                            {message.message}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>

                  <Divider />
                  <div className="text-center">
                    <Button
                      variant="outlined"
                      onClick={() => handleOpenReplyDialog(message.sender)}
                      sx={{
                        backgroundColor: '#EC634E',
                        color: 'white',
                        borderColor: '#EC634E',
                        margin: '8px',
                      }}
                    >
                      Répondre
                    </Button>
                  </div>
                </div>
              );
            })}
      </List>

      <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
        <DialogTitle>Répondre au message</DialogTitle>
        <DialogContent>
          {messagesWithRecipient.map((message, index) => (
            <div
              key={index}
              className={`message-container ${message.sender === userData.email ? 'sent-message' : 'received-message'}`}
            >
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary={message.sender}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text-primary"
                      >
                        {message.message}
                      </Typography>
                      <br />
                      {moment(message.datetime).format('LLL')}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
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
            <TextField
              name="message"
              label="Répondre"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              style={{ width: '400px' }}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              className="send-button"
            >
              Envoyer
            </Button>
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AllMessages;
