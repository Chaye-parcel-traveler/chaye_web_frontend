
import React, { useEffect, useReducer} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../styles/accueil.css';
import '../styles/nav.css';
import {Carousel,} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
moment().locale('fr')

function Home() {
    const initialestate = {
        loading: true,
        error: '',
        packages: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    packages: action.payload,
                    error: '',
                };
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    packages: [],
                    error: 'Something went wrong!!!!!',
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialestate);

    useEffect(() => {
        axios.get('http://localhost:5000/packages', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, [])
    return (
        <div className='content'>
            <div className='content-menu'>
                <Navbar />
            </div>
            <div className="content-body">
                <Header />
                <React.Fragment>
                    <div className="assurance">
                        <h4>Assurance</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste labore magni repudiandae et,
                            eum
                            deleniti quaerat nobis nemo aut praesentium adipisci facere? Quos, impedit nobis quisquam in harum
                            perspiciatis!...</p><a href="#">Lire la suite</a>
                    </div>
                    <h3 className='ms-3'>A la une</h3>
                    <div className='annonce'>
                       
                        {state.loading ? 'loading...' : state.packages.map((packages, index) => (
                        <Carousel showArrows={true} showThumbs={false}>
                            <Card  key={index} sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={`http://localhost:5000/${packages.picture}`}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <h3>{packages.content}</h3>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <p>{packages.departureCity}</p>
                                            <p>
                                                Dimensions: {packages.weight}x{packages.size}
                                            </p>
                                            <p>Date de Création : {moment(packages.creationDate).format('L')}</p>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Carousel>
                        ))}
                    </div>
                </React.Fragment>
                <div className="btnAnnonce">
                    <a href="/announcements" className="btn" >Voir tous les annonces</a>
                    <a href="/announcements" className="btn" >Carte intéractive</a>
                </div>
                <Footer />
            </div>

        </div>
    )

}

export default Home