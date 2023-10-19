import React from 'react';
import '../styles/aboutUs.css';
import '../styles/accueil.css';
import '../styles/nav.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';


function AboutUs() {
    return (
        <div className='content'>
            <div className='content-menu'>
                <Navbar />
            </div>
            <div className="content-body">
                <Header />

                <div className="content-main">
                    <div className="aboutUs-container">
                        <h1>À propos de Chaye - Livraison de Colis entre Particuliers</h1>
                        <p>Bienvenue sur la page "À propos de nous" de Chaye, votre partenaire de confiance pour la livraison de colis entre particuliers.</p>
                        <p>Nous sommes une équipe dédiée et passionnée qui s'engage à faciliter l'envoi et la réception de colis en mettant en relation des particuliers comme vous.</p>
                        <p>Notre mission est de rendre les livraisons de colis plus pratiques et accessibles, en exploitant la puissance de la communauté.</p>
                        <p>Que vous ayez besoin d'envoyer un colis à un ami, à un membre de votre famille ou à quelqu'un de votre quartier, Chaye est là pour vous aider à le faire rapidement et en toute sécurité.</p>
                        <p>Nous sommes fiers de notre engagement envers la simplicité, la fiabilité et la confiance dans notre service.</p>
                        <p>Explorez notre plateforme et découvrez comment Chaye peut simplifier vos livraisons de colis entre particuliers.</p>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
}

export default AboutUs;
