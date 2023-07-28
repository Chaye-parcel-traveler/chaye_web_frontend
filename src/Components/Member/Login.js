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
    localStorage.setItem("token", response.token);
    setAuthToken(response.token);

    return navigate('/');
  }

  return (
    <div className='Bg'>
      <div className=" d-flex justify-content-center">
        <a href="/"><img src={"img/logo.png"} alt="Logo" className="Logo" /></a>
      </div>
      <div className=" formule bg-white container-fluid col-4 my-5">
        <div className="m-5 ">
          <h1 className="text-center pt-5 fw-bold">Content de te revoir</h1>
          <p className="text-center ">Connectez-vous à votre compte</p>
          <form className='login' onSubmit={handleLogin}>
            <div className="mb-3">
              <input className="form-control" type="email" id="email" name="email" placeholder='Email' value={inputs.email || ""} 
        onChange={handleChange} />
            </div>
            <div className="mb-3">
              <input className="form-control" type="password" id="password" name="password" placeholder='Mot de passe' value={inputs.password || ""} 
        onChange={handleChange} />
            </div>
            <div className="mb-3 d-flex justify-content-between">
              <div>
                <input type="radio" id="rappeler" name="rappeler" />
                <label htmlFor="rappeler" className="form-label">Se rappeler de moi</label>
              </div>
              <a className="text-danger ms-5" href="#top">Mot de passe oublié?</a>
            </div>
            <div className="p-3 text-center">
              <input className="text-light fw-bold valider p-5 py-2" type="submit" value="Valider" />
            </div>
            <h6 className="text-center text-secondary">Ou inscrivez-vous en utilisant</h6>
            <hr />
            <div className="reseSocio fs-2 text-center">
              <a href="#top" onClick={() => googleLogin()} ><i className="me-3 fa-brands fa-google"></i></a>
              <a href="https://www.facebook.com"><i className="me-3 fa-brands fa-facebook"></i></a>
              <a href="https://www.icloud.com/mail"> <i className="fa-brands text-dark fa-apple"></i></a>
            </div>
            <p className="text-center py-5">Vous n'avez pas de compte? <a className="text-danger" href="/signup">Créez votre compte</a></p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
