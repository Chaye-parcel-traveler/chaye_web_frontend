import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import Footer from '../Footer/Footer';
import { useGoogleLogin } from '@react-oauth/google';
import { login } from '../../Services/member'
import { setAuthToken } from '../../setAuthToken';


function Login() {
  const [, setToken] = useState();
  const [, setUserData] = useState();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  let navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    redirect_uri: `${process.env.REACT_APP_API_URL}/auth/google/redirect`,
    ux_mode: 'redirect',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const qs = `code=${encodeURIComponent(codeResponse.code)}
        &scope=${encodeURIComponent(codeResponse.scope)}
        &authuser=${encodeURIComponent(codeResponse.authuser)}
        &prompt=${encodeURIComponent(codeResponse.prompt)}`;
      const tokens = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/google/callback?${qs}`);

      console.log('tokens',tokens);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  const handleLogin = async e => {
    e.preventDefault();
    const response = await login({
      email: inputs.email,
      password: inputs.password
    });
    console.log('token', response)
    setToken(response.token);
    sessionStorage.setItem("token", response.token);
    setAuthToken(response.token);

    const me = await axios.get('/me')
    setUserData(me)

    return navigate('/');
  }

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
              <form className="login" onSubmit={handleLogin}>
                <div className="mb-3">
                  <input className="form-control" type="email" id="email" name="email" placeholder="Email" value={inputs.email || ""} 
        onChange={handleChange}/>
                </div>
                <div className="mb-3">
                  <input className="form-control" type="password" id="password" name="password" placeholder="Mot de passe" value={inputs.password || ""} 
        onChange={handleChange}/>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                  <div>
                    <input type="checkbox" id="rappeler" name="rappeler" className="form-check-input" />
                    <label htmlFor="rappeler" className="form-check-label">Se rappeler de moi</label>
                  </div>
                  <a className="text-danger" href="/login">Mot de passe oublié?</a>
                </div>
                <div className="text-center mb-3">
                  <input className="btn btn-primary fw-bold valider" type="submit" value="Valider" />
                </div>
                <h6 className="text-center text-secondary">Ou inscrivez-vous en utilisant</h6>
                <hr />
                <div className="reseSocio text-center fs-2">
                <a href="#top" onClick={() => googleLogin()} ><i className="me-3 fa-brands fa-google"></i></a>
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
