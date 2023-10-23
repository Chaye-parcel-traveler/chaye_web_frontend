import React from 'react';
import '../styles/support.css';
import Header from '../Header/Header';

function Support() {
  return (
    <div className='content'>
    <div className="content-body">
        <Header />

        <div className="content-main">
    <div className="support-container">
      <h1>Support Chaye - Livraison de Colis entre Particuliers</h1>
      <p>Bienvenue sur la page de support de Chaye. Nous sommes là pour vous aider à faciliter vos livraisons de colis entre particuliers.</p>
      <h2>Comment nous contacter :</h2>
      <ul>
        <li>Par téléphone : 1-800-123-4567</li>
        <li>Par e-mail : support@chaye.com</li>
        <li>Sur les réseaux sociaux :
          <ul>
            <li>Facebook : <a href="https://www.facebook.com/chaye">facebook.com/chaye</a></li>
            <li>Twitter : <a href="https://www.twitter.com/chaye_support">@chaye_support</a></li>
          </ul>
        </li>
      </ul>
      <p>Nous sommes disponibles du lundi au vendredi, de 9h à 18h (heure locale). N'hésitez pas à nous contacter pour toute question, préoccupation ou demande d'assistance concernant vos livraisons de colis entre particuliers.</p>
      <h2>FAQ (Foire aux questions) :</h2>
      <p>Consultez notre <a href="/faq">FAQ</a> pour obtenir des réponses aux questions courantes sur l'utilisation de Chaye.</p>
    </div>
    </div>
            </div>

        </div>
  );
}

export default Support;
