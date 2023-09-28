import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import '../styles/accueil.css';
import '../styles/nav.css';
import '../styles/comment.css';
import FormComment from '../Comments/FormComment';
import CommentIcon from '@mui/icons-material/Comment';
import EmailIcon from '@mui/icons-material/Email';
import 'bootstrap/dist/css/bootstrap.min.css';
import moment from 'moment/moment';
import 'moment/locale/fr';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AllPackages from '../Package/AllPackages';
import Assurance from '../Header/Assurance';
import Message from '../Message/Message';
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
        switch (action.type) {
            case 'FETCH_ANNOUNCEMENTS_SUCCESS':
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
            .get('http://localhost:5000/announcements', { withCredentials: true })
            .then((response) => {
                dispatch({ type: 'FETCH_ANNOUNCEMENTS_SUCCESS', payload: response.data });
            })
            .catch(() => {
                dispatch({ type: 'FETCH_ANNOUNCEMENTS_ERROR' });
            });

        axios
            .get('http://localhost:5000/memberinfos', { withCredentials: true })
            .then((response) => {
                dispatch({ type: 'FETCH_MEMBERS_SUCCESS', payload: response.data });
            })
            .catch(() => {
                dispatch({ type: 'FETCH_MEMBERS_ERROR' });
            });
    }, []);

    const handleFavoriteClick = (announcement) => {
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
            <div className="content-menu">
                <Navbar />
            </div>
            <div className="content-body">
                <Header />
                <Assurance />
                <div className="content-main">
                    <h2 className="titre">Toutes les annonces</h2>
                    <div className="annonce">
                        {state.loadingAnnouncements || state.loadingMembers
                            ? 'Loading...'
                            : state.announcements.map((announcement, index) => (
                                <div className="card" key={index}>
                                    <div className="card-top">
                                        {/* Recherchez le membre associé à l'annonce */}
                                        {state.members.map((member) => {
                                            if (member._id === announcement.memberId) {
                                                recipient = member.email;
                                                console.log(recipient);

                                                return (
                                                    <div key={member._id}>
                                                        <img src={`http://localhost:5000/${member.imagename}`} alt="Membre" />
                                                    </div>

                                                );

                                            }
                                            return null;
                                        })}

                                        <Fab
                                            className={`${announcement.isFavorite ? 'text-danger' : 'text-secondary'}`}
                                            size="small"
                                            onClick={() => handleFavoriteClick(announcement)}
                                        >
                                            <FavoriteIcon />
                                        </Fab>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">
                                            Destination ................<b className="violet">{announcement.destination}</b> <br />
                                            Prix ...............<b className="violet">{announcement.priceKilo}€</b><br />
                                            Départ ...............<b className="violet"> {moment(announcement.departureDate).format('L')}</b><br />
                                            Arrivé  ................<b className="violet"> {moment(announcement.arrivalDate).format('L')}</b>
                                        </p>
                                    </div>
                                    <div className="card-bottom">
                                        <button className='m-3 btn btn-primary' onClick={() => handleCommentClick(announcement)}>
                                            <CommentIcon />
                                        </button>
                                        {showCommentForm && selectedAnnouncement === announcement && (
                                            <FormComment announcementId={announcement._id} />
                                        )}
                                        <button className='m-3 btn btn-primary' onClick={() => handleMessageClick(announcement)}>
                                            <EmailIcon />
                                        </button>
                                        {showMessage && selectedMessage && <Message recipient={recipient} />}


                                    </div>
                                </div>
                            ))}
                    </div>
                    <h2 className="titre">Les colis</h2>
                    <AllPackages />
                </div>
                <Footer />
            </div>

        </div>
    );
}

export default Announcements;
