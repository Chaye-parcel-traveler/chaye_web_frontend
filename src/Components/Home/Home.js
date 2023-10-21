import React from 'react';
// import axios from 'axios';
import Footer from '../Footer/Footer';
import AllComments from '../Comments/AllComments';
//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
import Assurance from '../Header/Assurance';

import TinySlider from "tiny-slider-react";
import 'tiny-slider/dist/tiny-slider.css';

moment().locale('fr')

function Home() {
    const settings = {
        // container: ".wide-slider-testimonial",
        items: 1,
        slideBy: 1, 
        axis: "horizontal",
        swipeAngle: false,
        speed: 700,
        nav: true,
        loop: true,
        edgePadding: 40,
        controls: true,
        controlsPosition: "bottom",
        autoHeight: true,
        autoplay: true,
        mouseDrag: true,
        autoplayHoverPause: true,
        autoplayTimeout: 3500,
        autoplayButtonOutput: false,
        controlsContainer: "#prevnext-testimonial",
        responsive: {
            350: {
                items: 1
            },

            500: {
                items: 2
            },
            600: {
                items: 3
            },
            900: {
                items: 5
            }
        },
    }

    const announcements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    /*
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
        axios.get('/packages', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, [])
*/
    return (

        <section className="home">
            <div className="text">Ouvrir le menu</div>

            {/*-- block video--> */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        {/*--mettre la video--> */}
                        <div className="box-video">
                            <span className="box-text-video">le content video</span>
                        </div>
                        {/*--fin de mettre la video--> */}
                    </div>
                </div>
            </div>
            {/*-- fin block video--> */}


            {/*-- block choix--> */}
            <div className="container">
                <div className="row">
                    <div className="col">
                        {/*--content title choix--> */}
                        <div className="box-chaye margin-top-36">
                            <h2>Que veux tu faire ?</h2>

                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-4">
                                        <a className="btnChaye" href="/addPackages">J'expédie</a>
                                    </div>
                                    <div className="col-4">
                                        <a className="btnChaye" href="/addAnnouncements">Je transporte</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*--fin content title choix--> */}
                    </div>
                </div>
            </div>
            {/*-- fin block choix--> */}
            <Assurance />
            {/*
                    <div className='d-flex justify-content-between'>
                        <h2 className='titre'>A la une</h2>
                        <h4 className='text-danger fw-bold text-decoration-underline'>Favoris</h4>
                    </div>
                    <Favoris />

                    <div className="btnAnnonce">
                        <a href="/announcements" className="btn" >Voir tous les annonces</a>
                        <a href="/carte" className="btn" >Carte intéractive</a>
                    </div>
                    */}
            {/*---Block AlaUne-->*/}
            <div className="container">
                <h2 className="txtLeft margin-top-36">A la une</h2>
                <div className="box-chaye sansFond margin-top-25 ">
                    <div className="section">
                        <div className="wide-slider-testimonial-wrap">
                            <TinySlider className="wide-slider-testimonial" settings={settings}>
                                {announcements.map((el, index) => (
                                    <div key={index} className="item">
                                        <blockquote className="block-testimonial">
                                            <div className="author">
                                                <img src="images/img.png" alt="Free template by TemplateUX" />
                                                <div className="txt-alaune">
                                                    <div><span> Destination</span>..............<span className="txtViolet">Guyane</span></div>
                                                    <div> <span> Poids disponible</span>........<span className="txtViolet">12kg</span></div>
                                                    <div>  <span> Prix</span>........................................<span className="txtViolet">60€</span></div>
                                                </div>
                                            </div>
                                        </blockquote>
                                    </div>
                                ))}
                            </TinySlider>
                        </div>

                        <div className="text-center mb-5 " style={{ paddingTop: '76px' }}>
                            <div id="prevnext-testimonial">
                                <span className="prev me-3" data-controls="prev">
                                    <span className="icon-chevron-left"></span>
                                </span>
                                <span className="next" data-controls="next">
                                    <span className="icon-chevron-right"></span>
                                </span>
                            </div>
                        </div>


                    </div>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-4">
                                <a className="btnChaye-purple" href="/announcements">Voir  tous les annonces</a>
                            </div>
                            <div className="col-4">
                                <a className="btnChaye-orange" href="#">Carte intéractive</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*---Block avis--*/}
            <div className="container">
                <h2 className="txtLeft margin-top-36">Avis</h2>
                <div className="box-chaye sansFond margin-top-25 ">
                    <AllComments />
                </div>
            </div>

            {/* categories */}
            <div className="container">
                <h2 className="txtLeft margin-top-36">Catégories</h2>
                <div className="container">
                    <div className="row cat-layout margin-top-25">
                        <div className="col">
                            <a href="single.html" className="h-entry mb-30 v-height gradient">

                                <div className="featured-img" style={{ backgroundImage: `url("images/caraibes.png")` }}></div>

                                <div className="text">

                                    <h2>Caraïbes</h2>
                                </div>
                            </a>
                        </div>
                        <div className="col">
                            <a href="single.html" className="h-entry mb-30 v-height gradient">

                                <div className="featured-img" style={{ backgroundImage: `url("images/europe.png")` }}></div>

                                <div className="text">

                                    <h2>Europe</h2>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row cat-layout">
                        <div className="col">
                            <a href="single.html" className="h-entry mb-30 v-height gradient">

                                <div className="featured-img" style={{ backgroundImage: `url("images/amerique.png")` }}></div>

                                <div className="text">

                                    <h2>Amérique</h2>
                                </div>
                            </a>
                        </div>
                        <div className="col">
                            <a href="single.html" className="h-entry mb-30 v-height gradient">

                                <div className="featured-img" style={{ backgroundImage: `url("images/afrique.png")` }}></div>

                                <div className="text">

                                    <h2>Afrique</h2>
                                </div>
                            </a>
                        </div>
                        <div className="col">
                            <a href="single.html" className="h-entry mb-30 v-height gradient">

                                <div className="featured-img" style={{ backgroundImage: `url("images/asie.png")` }}></div>

                                <div className="text">

                                    <h2>Asie</h2>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </section>
    )

}

export default Home