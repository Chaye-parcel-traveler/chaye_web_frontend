import React from 'react';
import '../styles/login.css';
import Footer from '../Footer/Footer';

function Login() {

  return (
    <div className="content-image">
      <div className=" d-flex justify-content-center">
        <a href="/"><img src={"img/logo.png"} alt="Logo" className="Logo" /></a>
      </div>
      <div className=" formule bg-white container-fluid col-4 my-5">
        <div className="m-5 ">
          <h1 className="text-center pt-5 fw-bold">Content de te revoir</h1>
          <p className="text-center ">Connectez-vous à votre compte</p>
          <form  className='login' action="http://localhost:5000/login" method="post">
            <div className="mb-3">
              <input className="form-control" type="email" id="email" name="email" placeholder='Email' />
            </div>
            <div className="mb-3">
              <input className="form-control" type="password" id="password" name="password" placeholder='Mot de passe'/>
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <div>
                <input type="radio" id="rappeler" name="rappeler" />
                <label htmlFor="rappeler" className="form-label">Se rappeler de moi</label>
              </div>
              <a className="text-danger ms-5" href="">Mot de passe oublié?</a>
            </div>
            <div className="p-3 text-center">
              <input className="text-light fw-bold valider p-5 py-2" type="submit" value="Valider" />
            </div>
            <h6 className="text-center text-secondary">Ou inscrivez-vous en utilisant</h6>
            <hr />
            <div className="reseSocio fs-2 text-center">
              <a href="https://www.google.com/intl/fr/gmail/about/"><i className="me-3 fa-brands fa-google"></i></a>
              <a href="https://www.facebook.com"><i className="me-3 fa-brands fa-facebook"></i></a>
              <a href="https://www.icloud.com/mail"> <i className="fa-brands text-dark fa-apple"></i></a>
            </div>
            <p className="text-center py-5">Vous n'avez pas de compte? <a className="text-danger" href="/signup">Créez votre compte</a></p>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Login;
