import React from 'react';
import '../styles/login.css';
import Footer from '../Footer/Footer';

function Login() {

  return (
    <div className="content-image">
      <div className=" d-flex justify-content-center">
        <a href="/"><img src={"/img/logo.png"} alt="Logo" className="Logo" /></a>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <div className="content-login bg-white my-5 p-4 rounded">
              <h1 className="text-center fw-bold">Content de te revoir</h1>
              <p className="text-center">Connectez-vous à votre compte</p>
              <form className="login" action="http://localhost:5000/login" method="post">
                <div className="mb-3">
                  <input className="form-control" type="email" id="email" name="email" placeholder="Email" />
                </div>
                <div className="mb-3">
                  <input className="form-control" type="password" id="password" name="password" placeholder="Mot de passe" />
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <input type="checkbox" id="rappeler" name="rappeler" className="form-check-input" />
                    <label htmlFor="rappeler" className="form-check-label">Se rappeler de moi</label>
                  </div>
                  <a className="text-danger" href="#">Mot de passe oublié?</a>
                </div>
                <div className="text-center mb-3">
                  <input className="btn btn-primary fw-bold valider" type="submit" value="Valider" />
                </div>
                <h6 className="text-center text-secondary">Ou inscrivez-vous en utilisant</h6>
                <hr />
                <div className="reseSocio text-center fs-2">
                  <a href="https://www.google.com/intl/fr/gmail/about/"><i className="me-3 fab fa-google"></i></a>
                  <a href="https://www.facebook.com"><i className="me-3 fab fa-facebook"></i></a>
                  <a href="https://www.icloud.com/mail"><i className="fab fa-apple"></i></a>
                </div>
                <p className="text-center py-3">Vous n'avez pas de compte? <a className="text-danger" href="/signup">Créez votre compte</a></p>
              </form>
            </div>
          </div>
        </div>
      </div>
        <div className='footerfixe'>
        <Footer/>
        </div>
  
    </div>
  );
}

export default Login;
