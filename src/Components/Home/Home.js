
import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react';
import '../styles/accueil.css';
//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
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
    const [state, dispatch] = useReducer(reducer, initialestate)

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
        <div className="">
            <div class="hero">
                <div class="heroItem">
                    <h2> Que veux tu faire?</h2>
                    <a href='/AddPackage'><input type="button" value="j'expédier" /></a>
                    <input type="button" value="je transporte" />
                </div>

            </div>
            <div className="search-bar">
                <input type="text" placeholder="Rechercher" />
                <button >Rechercher</button>
            </div>
            <div className="search-results">

            </div>
            <React.Fragment>
                <div className="assurance">
                    <h4>Assurance</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores iste labore magni repudiandae et,
                        eum
                        deleniti quaerat nobis nemo aut praesentium adipisci facere? Quos, impedit nobis quisquam in harum
                        perspiciatis!...</p><a href="">Lire la suite</a>
                </div>
                <h3>A la une</h3>
                <div className='annonce'>
                        {state.loading ? 'loading...' : state.packages.map((packages, index) => (
                            <div className='card' key={index}>
            
                                    <img src={`http://localhost:5000/${packages.picture}`} />
                                    <div>
                                        <h3>{packages.content}</h3>
                                        <p>{packages.departureCity}</p>
                                        <p>
                                            Dimensions: {packages.weight}x{packages.size}
                                        </p>
                                        <p>Date de Création{moment(packages.creationDate).format('L')}</p>
                                        <div className='btnAnnonce'>
                                        <Button primary as='a' href={`/EditPackage/${packages._id}`}>Edit</Button>
                                        <form action={`http://localhost:5000/deletepackage/${packages._id}?_method=DELETE`} method="post">
                                            <input type="hidden" name="_method" value="DELETE" />
                                            <Button positive>Supprimer</Button>
                                        </form>
                                        </div>
                                </div>
                            </div>
                        ))}
                </div>
            </React.Fragment>
            <div class="btnAnnonce">
                <input className="btn" type="button" value="Voir tous les annonces" />
                <input className="btn" type="button" value="Carte intéractive" />
            </div>
        </div>
    )

}




export default Home