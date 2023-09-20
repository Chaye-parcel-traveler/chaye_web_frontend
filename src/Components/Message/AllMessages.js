import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
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

moment().locale('fr');

function AllMessages() {
    const [userData, setUserData] = useState({}); // Initialisez avec un objet vide

    useEffect(() => {
        axios.get('http://localhost:5000/getConnectedUser', { withCredentials: true })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                setUserData(false);
            });
    }, []);

    const initialState = {
        loading: true,
        error: '',
        messages: [],
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    messages: action.payload,
                    error: '',
                };
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    messages: [],
                    error: 'Something went wrong!!!!!',
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get('http://localhost:5000/messages', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, []);

    // Trier les messages par date (du plus récent au plus ancien)
    const sortedMessages = [...state.messages].sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

    // Créer un objet pour stocker le dernier message par destinataire
    const lastMessagesByRecipient = {};

    sortedMessages.forEach(message => {
        if (userData && userData.email === message.recipient) {
            if (!lastMessagesByRecipient[message.recipient] || message.datetime > lastMessagesByRecipient[message.recipient].datetime) {
                lastMessagesByRecipient[message.recipient] = message;
            }
        }
    });

    // Extraire uniquement les derniers messages du tableau d'objets
    const filteredMessages = Object.values(lastMessagesByRecipient);

    const [openReplyDialog, setOpenReplyDialog] = useState(false); // État pour la boîte de dialogue
    const [selectedRecipient, setSelectedRecipient] = useState(null);
    const [messagesWithRecipient, setMessagesWithRecipient] = useState([]);

    const handleOpenReplyDialog = (recipient) => {
        setSelectedRecipient(recipient);

        // Filtrer les messages entre l'utilisateur actuel et le destinataire sélectionné
        const messages = state.messages.filter(
            (message) =>
                (message.sender === userData.email && message.recipient === recipient) ||
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
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {state.loading ? 'Loading...' : filteredMessages.map((message, index) => (
                    <div key={index}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={userData.image} />
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
                            <Button
                                variant="outlined"
                                onClick={() => handleOpenReplyDialog(message.sender)}
                            >
                                Répondre
                            </Button>
                        </ListItem>
                        <Divider />
                    </div>
                ))}
            </List>

            <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog}>
                <DialogTitle>Répondre au message</DialogTitle>
                <DialogContent>
                    {messagesWithRecipient.map((message, index) => (
                        <div key={index} className={`message-container ${message.sender === userData.email ? 'sent-message' : 'received-message'}`}>
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
                    <form className="form-message" action="http://localhost:5000/messages" method="post">
                        <input type="hidden" name="sender" value={userData.email} />
                        <input type="hidden" name="recipient" value={selectedRecipient} />
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
