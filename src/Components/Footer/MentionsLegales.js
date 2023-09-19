import React from 'react';
import '../styles/MentionsLegales.css';
import '../styles/accueil.css';
import '../styles/nav.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
function MentionsLegales() {
    return (
        <div className='content'>
            <div className='content-menu'>
                <Navbar />
            </div>
            <div className="content-body">
                <Header />
                <div className="mentions-legales">
                    <h1>Mentions Légales</h1>

                    <h2>1. Informations générales</h2>
                    <p>Ce site web est exploité par Chaye, une entreprise enregistrée en France.</p>

                    <h2>2. Coordonnées</h2>
                    <p>Adresse : [Adresse de Chaye à Paris, France]</p>
                    <p>Téléphone : [Numéro de Téléphone de Chaye]</p>
                    <p>Email : [Adresse Email de Chaye]</p>

                    <h2>3. Propriété intellectuelle</h2>
                    <p>Tous les contenus de ce site, y compris les textes, images, logos, marques et tout autre élément, sont protégés par les lois sur la propriété intellectuelle. Toute utilisation non autorisée est strictement interdite.</p>

                    <h2>4. Politique de confidentialité</h2>
                    <p>Vous pouvez consulter notre politique de confidentialité <a href="/politiqueDeConfidentialite">ici</a>.</p>

                    <h2>5. Cookies</h2>
                    <p>Ce site utilise des cookies pour améliorer l'expérience de l'utilisateur. En utilisant ce site, vous consentez à l'utilisation de cookies conformément à notre politique de cookies.</p>

                    <h2>6. Responsabilité</h2>
                    <p>Nous nous efforçons de fournir des informations exactes et à jour sur ce site, mais nous ne pouvons garantir l'exactitude des informations. Nous ne sommes pas responsables des dommages directs ou indirects résultant de l'utilisation de ce site ou de son contenu.</p>

                    <h2>7. Droit applicable</h2>
                    <p>Ce site est régi par les lois en vigueur en France. Tout litige lié à ce site sera soumis à la juridiction exclusive des tribunaux de Paris, France.</p>

                    <h2>8. Support</h2>
                    <p>Pour toute question ou assistance, vous pouvez nous contacter via notre page de <a href="/support">support</a>.</p>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default MentionsLegales;
