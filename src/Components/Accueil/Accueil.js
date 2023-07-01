
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react';
import '../styles/accueil.css';
//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
moment().locale('fr')

function Accueil() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = () => {
        // Effectuer la recherche avec la valeur saisie (searchTerm)
        // Vous pouvez utiliser axios.get ou toute autre méthode pour effectuer la recherche

        // Exemple de recherche avec axios
        axios.get(`http://localhost:5000/colis?q=${searchTerm}`, { withCredentials: true })
            .then(response => {
                setSearchResults(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la recherche:', error);
            });
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    const initialestate = {
        loading: true,
        error: '',
        colis: {}
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    colis: action.payload,
                    error: '',
                };
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    colis: {},
                    error: 'Something went wrong!!!!!',
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialestate)

    useEffect(() => {
        axios.get('http://localhost:5000/colis', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, [])
    return (
        <div className="content">
            <div class="hero">
                <div class="heroItem">
                    <h2> Que veux tu faire?</h2>
                    <a href='/ajoutcolis'><input type="button" value="j'expédier" /></a>
                    <input type="button" value="je transporte" />
                </div>

            </div>
            <div className="search-bar">
                <input type="text" placeholder="Rechercher" value={searchTerm} onChange={handleInputChange} />
                <button onClick={handleSearch}>Rechercher</button>
            </div>
            <div className="search-results">
                {/* Afficher les résultats de la recherche */}
                {searchResults.map((colis, index) => (
                    <div key={index}>
                        {/* Afficher les détails du colis */}
                    </div>
                ))}
            </div>
            <React.Fragment>
                <div className="assurance">
                    <h4>Assurance</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste labore magni repudiandae et,
                        eum
                        deleniti quaerat nobis nemo aut praesentium adipisci facere? Quos, impedit nobis quisquam in harum
                        perspiciatis!...</p><a href="">Lire la suite</a>
                </div>
                <div className='annonce'>
                    <h4>A la une</h4>
                    <Card.Group>

                        {state.loading ? 'loading...' : state.colis.map((colis, index) => (
                            <div>

                                <Card key={index}>
                                    <img src={`http://localhost:5000/${colis.photo}`} />
                                    <Card.Content>
                                        <Card.Header>{colis.contenu}</Card.Header>
                                        <Card.Meta>{colis.villeDepart}</Card.Meta>
                                        <Card.Description>
                                            Dimensions: {colis.largeur}cm x {colis.longueur}cm x {colis.profondeur}cm
                                        </Card.Description>
                                        <Card.Description>Date limite d'Expédition : {moment(colis.dateLimiteExpedition).format('L')}</Card.Description>
                                        <Button primary as='a' href={`/editcolis/${colis._id}`}>Edit</Button>
                                        <form action={`http://localhost:5000/colis/delete/${colis._id}?_method=DELETE`} method="post">
                                            <input type="hidden" name="_method" value="DELETE" />

                                            <Button positive>Supprimer</Button>
                                        </form>
                                    </Card.Content>
                                </Card>

                            </div>
                        ))};
                    </Card.Group>
                </div>
            </React.Fragment>
            <div class="btnAnnonce">
                <input className="btn" type="button" value="Voir tous les annonces" />
                <input className="btn" type="button" value="Carte intéractive" />
            </div>
        </div>
    )

}




export default Accueil