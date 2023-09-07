
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import { CardActionArea } from '@mui/material';
import '../styles/accueil.css';
import '../styles/nav.css';

//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
moment().locale('fr')

function Home() {
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
                if (response.data.length > 0) {
                    const memberId = response.data[0].memberId;
                    axios.get(`http://localhost:5000/member/${memberId}`)
                        .then((response) => {
                            setMember(response.data);
                        })
                        .catch((error) => {
                            setMember(false);
                        });
                }
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, []);
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
                                <div className='card-top w-100'>
                                    <img src="/img/avion.jpg"  alt="" />
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

                </div>
                <Footer />
            </div>

        </div>
    )

}




export default Home