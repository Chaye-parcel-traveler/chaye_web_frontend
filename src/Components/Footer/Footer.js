import React from 'react'
import '../styles/footer.css';
function Footer() {
  return (
    <footer className=''>
      <div className=''>
        <p >© 2023,Chaye</p>
      </div>
      <ul className="lienFooter ">
          <li>
             <a href="/mentionlegale">Mentions légales</a>
          </li>
          <li> 
             <a href="/politiqueDeConfidentialite">Politiques de confidentialité</a>
          </li>
          <li>
             <span>Tous droits reservés</span>
          </li>
      </ul>
    </footer>
  )
}

export default Footer
