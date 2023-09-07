import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import '../styles/accueil.css';
import '../styles/nav.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import AllComments from '../Comments/AllComments';
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
                    <h3 className='ms-4'>A la une</h3>
                    <div className='annonce'>
                        {state.loading ? 'loading...' : state.packages.map((packages, index) => (
                            <div className="card " key={index}>
                                <div className='card-top '>
                                    <img src={`http://localhost:5000/${packages.picture}`} alt="" />
                                </div>
                                <div className="card-body">
                                    <p className="card-text ">
                                        Départ :<b className="text-primary">{packages.departureCity}</b> <br />
                                        Contenu : <b className="text-primary">{packages.content}</b><br />
                                        Dimensions: <b className="text-primary">{packages.weight}x{packages.size}</b><br />
                                        Date de Création :<b className="text-primary"> {moment(packages.creationDate).format('L')}</b><br />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </React.Fragment>
                <div className="btnAnnonce">
                    <a href="/announcements" className="btn" >Voir tous les annonces</a>
                    <a href="/announcements" className="btn" >Carte intéractive</a>
                </div>
                <div>
                <h3 className='ms-4'>Avis</h3>

                <AllComments />
                </div>

                <div className="categorie">
                    <h4>Catégories</h4>
                    <div className="box1 d-flex ">
                        <div className="item1">
                            <h5>caraibies</h5>
                        </div>
                        <div className="item2">
                            <h5>Europe</h5>
                        </div>
                    </div>
                    <div className="box2 my-5">
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
                 <Footer/>
            </div>

        </div>
    )

}

export default Home