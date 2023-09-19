import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import '../styles/accueil.css';
import '../styles/nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AllComments from '../Comments/AllComments';
//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
import Favoris from '../Favoris/Favoris';
import Assurance from '../Header/Assurance';
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
                <Assurance />
                <div className="content-main">
                    <div className='d-flex justify-content-between'>
                        <h2 className='titre'>A la une</h2>
                        <h4 className='text-danger fw-bold text-decoration-underline'>Favoris</h4>
                    </div>
                    <Favoris />

                    <div className="btnAnnonce">
                        <a href="/announcements" className="btn" >Voir tous les annonces</a>
                        <a href="/carte" className="btn" >Carte intéractive</a>
                    </div>
                    <div>
                        <h2 className='titre'>Avis</h2>
                        <AllComments />
                    </div>

                    <div className="categorie">
                        <h2 className='titre'>Catégories</h2>
                        <div className="box1">
                            <div className="item1">
                                <h5>caraibies</h5>
                            </div>
                            <div className="item2">
                                <h5>Europe</h5>

                            </div>
                        </div>
                        <div className="box2">
                            <div className="item3 ">
                                <h5>Amérique</h5>
                            </div>
                            <div className="item4 ">
                                <h5>Afrique</h5>
                            </div>

                            <div className="item5">
                                <h5>Asie</h5>
                            </div>
                        </div>
                    </div>
                </div>
                    <Footer />
            </div>

        </div>
    )

}

export default Home