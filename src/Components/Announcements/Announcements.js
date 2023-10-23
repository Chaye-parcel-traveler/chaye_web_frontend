import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import '../styles/comment.css';
import FormComment from '../Comments/FormComment';
import CommentIcon from '@mui/icons-material/Comment';
import EmailIcon from '@mui/icons-material/Email';
import moment from 'moment/moment';
import 'moment/locale/fr';
import Header from '../Header/Header';
import AllPackages from '../Package/AllPackages';
import Assurance from '../Header/Assurance';
import Message from '../Message/Message';
import CarrouselAnnouncements from './CarrousselAnnouncements';
moment().locale('fr');
function Announcements() {
    const [showMessage, setShowMessage] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const initialState = {
        loadingAnnouncements: true,
        errorAnnouncements: '',
        announcements: [],
        loadingMembers: true,
        errorMembers: '',
        members: [],
    };

    const reducer = (state, action) => {
        console.log('reducer', action)
        switch (action.type) {
            case 'FETCH_ANNOUNCEMENTS_SUCCESS':
                console.log('yeahhh des annonces');
                return {
                    ...state,
                    loadingAnnouncements: false,
                    announcements: action.payload,
                    errorAnnouncements: '',
                };
            case 'FETCH_ANNOUNCEMENTS_ERROR':
                return {
                    ...state,
                    loadingAnnouncements: false,
                    errorAnnouncements: 'Something went wrong with announcements!',
                };
            case 'FETCH_MEMBERS_SUCCESS':
                return {
                    ...state,
                    loadingMembers: false,
                    members: action.payload,
                    errorMembers: '',
                };
            case 'FETCH_MEMBERS_ERROR':
                return {
                    ...state,
                    loadingMembers: false,
                    errorMembers: 'Something went wrong with members!',
                };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios
            .get('/announcements')
            .then((response) => {
                dispatch({ type: 'FETCH_ANNOUNCEMENTS_SUCCESS', payload: response.data });
            })
            .catch(() => {
                dispatch({ type: 'FETCH_ANNOUNCEMENTS_ERROR' });
            });
/*
        axios
            .get('http://localhost:5000/memberinfos', { withCredentials: true })
            .then((response) => {
                dispatch({ type: 'FETCH_MEMBERS_SUCCESS', payload: response.data });
            })
            .catch(() => {
                dispatch({ type: 'FETCH_MEMBERS_ERROR' });
            });
*/
    }, []);

    const handleFavoriteClick = (announcement) => {
        /*
        const id = announcement._id.toString();
        axios
            .put(
                `http://localhost:5000/favorites/${id}`,
                { isFavorite: !announcement.isFavorite },
                { withCredentials: true }
            )
            .then(() => {
                dispatch({ type: 'TOGGLE_FAVORITE', payload: { _id: announcement._id } });
            })
            .catch((error) => {
                console.error("Erreur lors de la mise à jour de l'état de favori :", error);
            });
*/
    };
    const handleCommentClick = (announcement) => {
        setSelectedAnnouncement(announcement); // Stocke l'annonce sélectionnée
        setShowCommentForm(true); // Affiche le formulaire de commentaire
    };
    const handleMessageClick = (announcement) => {
        console.log("Message icon clicked");
        setSelectedMessage(announcement);
        setShowMessage(true);
    };
    let recipient = null;

    return (
        <div className="content">
            <div className="content-body">
                <Header />
                <Assurance />
                <div className="content-main">
                    <h2 className="titre">Toutes les annonces</h2>
                    <CarrouselAnnouncements />
                    <h2 className="titre">Les colis</h2>
                    <AllPackages />
                </div>
            </div>

        </div>
    );
}

export default Announcements;
