
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
    const [members, setMembers] = useState([]);
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
        axios.get('http://localhost:5000/announcements')
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
        axios.get('http://localhost:5000/members')
            .then(response => {
                const members = response.data;
                setMembers(members);
            }).catch(error => {
                console.error('Erreur lors de la récupération des membres :', error);
            });
    }, [])
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
                            perspiciatis!...</p><a href="">Lire la suite</a>
                    </div>
                    <h3 className='ms-3'>Toutes les annonces</h3>
                    <div className='annonce'>

                        {state.loading ? 'loading...' : state.announcements.map((announcements, index) => (
                            <Card key={index} sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    {members && members.imagename && (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={members.imagename}
                                            alt="Image de l'utilisateur"
                                        />

                                    )}
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <h3>{announcements.description}</h3>
                                            <Fab disabled aria-label="like">
                                                <FavoriteIcon />
                                            </Fab>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <p>Ville de départ : {announcements.departure_city}</p>
                                            <p>Ville de destination : {announcements.destination}</p>
                                            <p>Type d'annonce : {announcements.announcements_type}</p>
                                            <p>Prix au kilo  : {announcements.price_kilo} €</p>
                                            <p>Date de Départ : {moment(announcements.departure_date).format('L')}</p>
                                            <p>Date d'arrivée : {moment(announcements.arrival_date).format('L')}</p>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        ))}
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )

}




export default Home