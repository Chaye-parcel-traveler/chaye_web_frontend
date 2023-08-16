import React from 'react'
import '../styles/footer.css';
function Footer() {
  return (
    <footer>
      <div className='m-2'>
        <p >© 2023,Chaye</p>
      </div>
      <ul className="lienFooter">
          <li>
             <a href="#">Mentions légales</a>
          </li>
          <li> 
             <a href="#">Politiques de confidentialité</a>
          </li>
          <li>
             <a href="#">Tous droits reservés</a>
          </li>
      </ul>
    </footer>
  )
}

export default Footer
