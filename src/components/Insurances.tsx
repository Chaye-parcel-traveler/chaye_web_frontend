import React from 'react'

type StyledElement = HTMLElement & { style: CSSStyleDeclaration };

const Insurances = () => {
  const savoirPlus = document.querySelector("div.savoirplus") as StyledElement;
  const toggleDisplay = () => savoirPlus?.style.display == 'none' ? 'block' : 'none';

  return ( 
      <div className="container">
        <h2 className="txtLeft margin-top-36">Assurance</h2>
        <div className="box-chaye margin-top-25 ">
          <div className="displayFlex paddingAssurance">
            <div>
              <p className ="txtP">
                Bienvenue sur notre appli de transport de colis entre particuliers, 
                là où le partage et la convivialité sont à l'honneur ! 
                Vous avez besoin d'envoyer un colis en toute sécurité ? 
                Ne cherchez plus, nous sommes là pour vous ! 
                Avec notre plateforme collaborative, 
                vous pouvez désormais expédier vos colis en toute tranquillité.
              </p>
              <a href="javascript:;" 
              onClick={ toggleDisplay } 
              style={{ color: 'blue!important' }}>
                Lire la suite
              </a>
                <div className="savoirplus" style={{ display:'none', fontSize: '10px !important' }}>
                     <p className ="txtP">
                        Nous savons à quel point la prise en charge de votre envoi est importante, 
                        c'est pourquoi nous nous engageons à veiller sur votre précieux colis à chaque étape du trajet.
                        Avec notre service de transport entre particuliers, 
                        vous bénéficiez d'une assurance complète en cas de problème. 
                        Votre satisfaction et votre sérénité sont notre priorité absolue ! 
                        Si par hasard un imprévu survenait pendant le transport, soyez rassuré(e), 
                        nous prendrons les mesures nécessaires pour résoudre la situation avec diligence et efficacité. 
                        Notre communauté est animée par la bienveillance et l'entraide, 
                        faisant de chaque envoi une expérience conviviale et agréable.  
                        Oubliez les tracas du transport traditionnel, 
                        rejoignez-nous et partez à l'aventure avec vos colis en toute confiance ! 
                        Alors, prêt(e) à vivre une expérience de transport unique, solidaire et sans soucis ? 
                        Téléchargez notre appli dès maintenant et 
                        embarquez dans cette aventure collective pour des envois sereins et heureux ! 📦🌟 
                    </p>                                                           
                </div>
              </div>
            <div>
              <img src="images/logochayeassurance.png" style={{ display: 'block', margin: '0 auto' }} />
            </div>
          </div>
        </div>

      </div>
  )
}

export default Insurances