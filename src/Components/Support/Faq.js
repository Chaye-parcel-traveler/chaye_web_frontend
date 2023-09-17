import React from 'react';
import '../styles/faq.css';
import '../styles/accueil.css';
import '../styles/nav.css';
import Navbar from '../NavBar/NavBar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function Faq() {
    return (
        <div className='content'>
            <div className='content-menu'>
                <Navbar />
            </div>
            <div className="content-body">
                <Header />

                <div className="content-main">
                    <div className="faq-container">
                        <h1>FAQ - Questions Fréquentes</h1>

                        <div className="faq-item">
                            <h2>1. Comment fonctionne Chaye ?</h2>
                            <p>Chaye est une plateforme qui met en relation les expéditeurs et les livreurs locaux pour faciliter les livraisons de colis entre particuliers. Les expéditeurs créent une demande de livraison, et les livreurs locaux peuvent accepter ces demandes pour effectuer la livraison.</p>
                        </div>

                        <div className="faq-item">
                            <h2>2. Comment puis-je devenir un livreur sur Chaye ?</h2>
                            <p>Pour devenir un livreur sur Chaye, vous devez vous inscrire en tant que livreur, fournir les informations requises, passer par une vérification de sécurité, puis vous serez prêt à accepter des demandes de livraison.</p>
                        </div>

                        <div className="faq-item">
                            <h2>3. Comment puis-je suivre ma livraison ?</h2>
                            <p>Une fois que votre demande de livraison est acceptée par un livreur, vous pourrez suivre la livraison en temps réel sur notre application. Vous recevrez également des mises à jour par notification.</p>
                        </div>

                        <div className="faq-item">
                            <h2>4. Comment puis-je payer pour une livraison ?</h2>
                            <p>Chaye propose plusieurs options de paiement sécurisées, y compris les cartes de crédit et les portefeuilles électroniques. Vous pouvez choisir la méthode de paiement qui vous convient le mieux lors de la création de la demande de livraison.</p>
                        </div>

                        <div className="faq-item">
                            <h2>5. Que faire en cas de problème avec ma livraison ?</h2>
                            <p>En cas de problème avec votre livraison, vous pouvez contacter notre service d'assistance au numéro de téléphone indiqué sur notre page de support. Nous serons heureux de vous aider à résoudre tout problème rapidement.</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    );
}

export default Faq;
