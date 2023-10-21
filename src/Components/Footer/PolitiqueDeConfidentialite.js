import React from 'react';
import '../styles/PolitiqueDeConfidentialite.css';
import '../styles/accueil.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function PolitiqueDeConfidentialite() {
    return (
        <div className='content'>
            <div className="content-body">
                <Header />
                <div className="politique-de-confidentialite">
                    <h1>Politique de Confidentialité</h1>

                    <p>Cette politique de confidentialité décrit comment Chaye recueille, utilise et protège vos données personnelles lorsque vous utilisez notre service de livraison de colis entre particuliers.</p>

                    <h2>Collecte des données</h2>
                    <p>Nous pouvons collecter les informations suivantes :</p>
                    <ul>
                        <li>Votre nom</li>
                        <li>Adresse de livraison</li>
                        <li>Numéro de téléphone</li>
                        <li>Adresse email</li>
                        <li>Informations sur les colis à livrer</li>
                    </ul>

                    <h2>Utilisation des données</h2>
                    <p>Nous utilisons vos données personnelles aux fins suivantes :</p>
                    <ul>
                        <li>Pour organiser la livraison de colis entre utilisateurs</li>
                        <li>Pour vous contacter concernant les livraisons</li>
                        <li>Pour améliorer notre service</li>
                    </ul>

                    <h2>Protection des données</h2>
                    <p>Nous prenons des mesures de sécurité pour protéger vos données personnelles et assurer leur confidentialité.</p>

                    <h2>Partage des données</h2>
                    <p>Nous ne partageons pas vos données personnelles avec des tiers sauf si cela est nécessaire pour la livraison de colis ou si requis par la loi.</p>

                    <h2>Cookies</h2>
                    <p>Notre site web utilise des cookies pour améliorer l'expérience utilisateur. Vous pouvez choisir de les accepter ou de les désactiver dans les paramètres de votre navigateur.</p>

                    <h2>Accès et Contrôle</h2>
                    <p>Vous avez le droit d'accéder à vos données personnelles, de les corriger ou de les supprimer. Vous pouvez également vous opposer au traitement de vos données en nous contactant.</p>

                    <h2>Contact</h2>
                    <p>Pour toute question concernant notre politique de confidentialité, vous pouvez nous contacter via notre page de <a href="/support">support</a>.</p>
                </div>
                <Footer />
            </div>
        </div>
  );
}

export default PolitiqueDeConfidentialite;
