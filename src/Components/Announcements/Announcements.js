
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import '../styles/accueil.css';
import '../styles/nav.css';

//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AllPackages from '../Package/AllPackges';
moment().locale('fr')

function Announcements() {
    const [member, setMember] = useState({});
    const initialestate = {
        loading: true,
        error: '',
        announcements: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    announcements: action.payload,
                    error: '',
                };
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    announcements: [],
                    error: 'Something went wrong!!!!!',
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialestate);

    useEffect(() => {
        axios.get('http://localhost:5000/announcements', { withCredentials: true })
            .then(response => {
                    const memberId = response.data[0].memberId.toString();
                    axios.get(`http://localhost:5000/member/${memberId}`)
                        .then((response) => {
                            console.log('les information de un member',response.data);
                            setMember(response.data);
                        })
                        .catch((error) => {
                            setMember(false);
                        });
                
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, []);


    const handleFavoriteClick = (announcement) => {
        const id = announcement._id.toString();
        console.log(announcement.isFavorite);
        axios.put(`http://localhost:5000/favorites/${id}`, { isFavorite: !announcement.isFavorite }, { withCredentials: true })
            .then(response => {
                dispatch({ type: 'TOGGLE_FAVORITE', payload: { _id: announcement._id } });
            })
            .catch(error => {
                console.error('Erreur lors de la mise à jour de l\'état de favori :', error);
            });
    };

    return (
        <div className='content'>
            <div className='content-menu'>
                <Navbar />
            </div>
            <div className="content-body">
                <Header />
                <div>
                    <div className="assurance">
                        <h4>Assurance</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste labore magni repudiandae et,
                            eum
                            deleniti quaerat nobis nemo aut praesentium adipisci facere? Quos, impedit nobis quisquam in harum
                            perspiciatis!...</p><a href="#">Lire la suite</a>
                    </div>
                    <h3 className='ms-3'>Toutes les annonces</h3>
                    <div className='annonce'>
                        {state.loading ? 'loading...' : state.announcements.map((announcement, index) => (
                            <div className="card " key={index}>
                                <div className="card-top">
                                    <img src="/img/avion.jpg" alt="" />
                                    <Fab className={`favori ${announcement.isFavorite ? 'favori-actif' : ''}`} onClick={() => handleFavoriteClick(announcement)}>
                                         <FavoriteIcon />
                                    </Fab>
                                </div>
                                <div className="card-body">
                                    <p className="card-text ">
                                        Destination .................<b className="text-primary">{announcement.destination}</b> <br />
                                        Description .................<b className="text-primary">{announcement.description}</b><br />
                                        Prix .............................<b className="text-primary">{announcement.priceKilo}€</b><br />
                                        Départ .....................<b className="text-primary"> {moment(announcement.departureDate).format('LL')}</b><br />
                                        Arrivé  .................<b className="text-primary"> {moment(announcement.arrivalDate).format('LL')}</b>

                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h3 className='ms-4'>Les colis</h3>
                    <AllPackages />
                </div>
                <Footer />
            </div>

        </div>
    )

}




export default Announcements