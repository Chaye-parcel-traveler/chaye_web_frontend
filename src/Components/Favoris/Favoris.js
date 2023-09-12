import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import '../styles/accueil.css';
import moment from 'moment/moment';
import 'moment/locale/fr';

moment().locale('fr');

function Favoris() {
    const [favoriteAnnouncements, setFavoriteAnnouncements] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/favorites', { withCredentials: true })
            .then(response => {
                setFavoriteAnnouncements(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des annonces favorites :', error);
            });
    }, []);



    return (
        <div className='annonce'>
            {favoriteAnnouncements.map((announcement, index) => (
                <div className="card " key={index}>
                    <div className="card-top">
                        <img src="/img/avion.jpg" alt="" />
                        <Fab disabled aria-label="like">
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

    );
}

export default Favoris;
