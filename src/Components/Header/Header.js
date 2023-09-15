import React, { useState } from 'react';
import '../styles/header.css';

function Header() {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };
    return (
        <React.Fragment>
            <div>
                <div className="hero me-2">
                    <div className="heroItem">
                        <h2> Que veux tu faire?</h2>
                        <a href='/AddPackage'><input className='fw-bold' type="button" value="J'expédie" /></a>
                        <a href='/AddAnnouncements'><input type="button" className='fw-bold' value="Je transporte" /></a>
                    </div>
                </div>
                <div className='content-header'>
                <div className="search me-2">
                    <input className=" form-control py-3 " type="search" placeholder="Recherche" aria-label="Search" />
                </div>
                </div>
            </div>
            <div className='content-header'>
                <h2 className='titre'>Assurance</h2>
                <div className="assurance">
                    <div>
                        <p className="paraAssurance">
                            Bienvenue sur notre application de transport de colis entre particuliers, là où le partage et la convivialité
                            sont à l'honneur ! Vous avez besoin d'envoyer un colis en toute sécurité ? Ne cherchez plus, nous sommes
                            là pour vous !
                            Avec notre plateforme collaborative, vous pouvez désormais expédier vos colis en toute tranquillité.
                        </p>
                        <a href="#" onClick={toggleShowMore} style={{ color: 'blue', fontWeight: 'bold' }}>
                            {showMore ? 'Réduire' : 'Lire la suite'}
                        </a>
                        {showMore && (
                            <div className="savoirplus" style={{ fontSize: '10px' }}>
                                <p className="paraAssurance">
                                    Nous savons à quel point la prise en charge de votre envoi est importante, c'est pourquoi nous nous
                                    engageons à veiller sur votre précieux colis à chaque étape du trajet.
                                    Avec notre service de transport entre particuliers, vous bénéficiez d'une assurance complète en cas de
                                    problème. Votre satisfaction et votre sérénité sont notre priorité absolue !
                                    Si par hasard un imprévu survenait pendant le transport, soyez rassuré(e), nous prendrons les mesures
                                    nécessaires pour résoudre la situation avec diligence et efficacité. Notre communauté est animée par
                                    la bienveillance et l'entraide, faisant de chaque envoi une expérience conviviale et agréable. Oubliez
                                    les tracas du transport traditionnel, rejoignez-nous et partez à l'aventure avec vos colis en toute
                                    confiance ! Alors, prêt(e) à vivre une expérience de transport unique, solidaire et sans soucis ?
                                    Téléchargez notre appli dès maintenant et embarquez dans cette aventure collective pour des envois
                                    sereins et heureux ! 📦🌟
                                </p>
                            </div>
                        )}
                    </div>
                    <div>
                        <img src="/img/logochayeassurance.png" style={{ display: 'block', margin: '0 auto' }} alt="Logo Assurance" />
                    </div>
                </div>
            </div>
        </React.Fragment>




    )
}

export default Header
