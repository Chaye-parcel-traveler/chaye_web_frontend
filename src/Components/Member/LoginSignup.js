import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { login } from '../../Services/member'
import { setAuthToken } from '../../setAuthToken';
import './LoginSignup.css'


function Login() {
  const [, setToken] = useState();
  const [, setUserData] = useState();
  const [inputs, setInputs] = useState({});
  const [showSignUp, setShowSignUp] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
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

      console.log('tokens', tokens);
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
  const handleSignup = async e => {
    e.preventDefault();

    const formData = {
      // file: file,
      lastname: inputs.lastname,
      firstname: inputs.firstname,
      email: inputs.email,
      password: inputs.password,
      address: inputs.address,
      phone: inputs.phone,
      // status: status,
    }
    const response = await axios.post(`/members`, formData)
    console.log(response.data);
    navigate('/loginSignup');
  }

  //   links.forEach(link => {
  //     link.addEventListener("click", e => {
  //        e.preventDefault(); //preventing form submit
  //        forms.classList.toggle("show-signup");
  //     })
  // })
  const toggleSignup = () => {
    setShowSignUp(!showSignUp);
  }

  return (
    <div className='page-login' >
      <section className="logoChaye">
        <img src="images/logoChaye.png" /></section>
      <section className={`container container-login forms ${showSignUp ? 'show-signup' : ''}`}>
        <div className="form login">
          <div className="form-content">
            <header>
              <h2>Content de te revoir</h2>
              <h4 style={{ fontSize: '17px!important', fontFamily: 'Poppins, sans-serif' }} >Connectez-vous à votre compte</h4>

            </header>
            <form onSubmit={handleLogin}>
              <div className="field input-field">
                <input type="email" placeholder="Email" className="input" onChange={handleChange} />
              </div>

              <div className="field input-field">
                <input type="password" placeholder="Mot de passe" className="password" onChange={handleChange} />
                <i class='bx bx-hide eye-icon'></i>
              </div>

              <div className="form-link" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>  <input type="checkbox" id="scales" name="scales" checked /> <span href="#" className="serappeller">Se rappeler de moi</span></div>
                <div> <a href="#" className="forgot-pass">Mot de passe oublié</a></div>

              </div>

              <div className="field button-field">
                <button className="btnValider">Valider</button>
              </div>
            </form>

            <div className="form-link">
              <span onClick={toggleSignup}>Vous n’avez pas de compte ? <a href="#" className="link signup-link"> Créer votre  compte </a></span>
            </div>
          </div>

          <div className="line"></div>

          <div className="media-options">
            <a href="#" className="field facebook">
              <i class='bx bxl-facebook facebook-icon'></i>
              <span>Se connecter avec Facebook</span>
            </a>
          </div>

          <div className="media-options">
            <a href="#" className="field google">
              <img src="images/google.png" alt="" className="google-img" />
              <span>Se connecter avec Google</span>
            </a>
          </div>
          <div className="media-options">
            <a href="#" className="field apple">
              <i class='bx bxl-apple apple-icon'></i>
              <span>Se connecter avec Apple</span>
            </a>
          </div>

        </div>

        {/* <!-- Signup Form --> */}

        <div className="form signup">
          <div className="form-content">
            <header> <h2>S’enregistrer</h2>
              <h4 style={{ fontSize: '17px!important', fontFamily: 'Poppins, sans-serif' }}>Créez votre nouveau compte</h4></header>
            <form onSubmit={handleSignup}>
              <div className="field input-field">
                <input type="Name" placeholder="Prénom" className="input" name="lastname" onChange={handleChange} />
              </div>

              <div className="field input-field">
                <input type="FirstName" placeholder="Nom" className="input" name="firstname" onChange={handleChange} />
              </div>

              <div className="field input-field">
                <input type="Address" placeholder="Adresse" className="input" name="address" onChange={handleChange} />
              </div>

              <div className="field input-field">
                <input type="Phone" placeholder="Téléphone" className="input" name="phone" onChange={handleChange} />
              </div>

              {/* <div className="field input-field">
                <input type="Flag" placeholder="Pays" className="input" onChange={handleChange} />
              </div> */}
              <div className="field input-field">
                <input type="email" placeholder="Email" className="input" name="email" onChange={handleChange} />
              </div>

              <div className="field input-field">
                <input type="password" placeholder="Créer votre mot de passe" className="password" name="password" onChange={handleChange} />
              </div>

              {/* <div className="field input-field">
                <input type="password" placeholder="Confirmer votre mot de passe" className="password" />
                <i class='bx bx-hide eye-icon'></i>
              </div> */}

              <div className="field button-field">
                <button className="btnValider">Valider</button>
              </div>
            </form>

            <div className="form-link">
              <span onClick={toggleSignup}>Vous avez déjà un compte ? <a href="#" className="link login-link">Se connecter</a></span>
            </div>
          </div>

          <div className="line"></div>

          <div className="media-options">
            <a href="#" className="field facebook">
              <i class='bx bxl-facebook facebook-icon'></i>
              <span>Se connecter avec Facebook</span>
            </a>
          </div>

          <div className="media-options">
            <a href="#" className="field google">
              <img src="images/google.png" alt="" className="google-img" />
              <span>Se connecter avec Google</span>
            </a>
          </div>

          <div className="media-options">
            <a href="#" className="field apple">
              <i class='bx bxl-apple apple-icon'></i>
              <span>Se connecter avec Apple</span>
            </a>
          </div>

        </div>
      </section>
    </div>
  );
}

export default Login;
