import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/fr'
import Assurance from '../Header/Assurance';

import Header from '../Header/Header';
import CarrouselAnnouncements from '../Announcements/CarrousselAnnouncements';

moment().locale('fr')

function Home() {
    return (

        <div>
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
            <Header />
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
            <CarrouselAnnouncements />
            {/*---Block avis--*/}
            <div className="container">
                <h2 className="txtLeft margin-top-36">Avis</h2>
                <div className="box-chaye sansFond margin-top-25 ">
                    {/* <AllComments /> */}
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
        </div>
    )

}

export default Home