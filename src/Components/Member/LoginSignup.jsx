import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { login } from '../../Services/member'
import apiClient, { getApiUrl, persistAuthToken } from '../../lib/api';
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
    redirect_uri: getApiUrl('/auth/google/redirect'),
    ux_mode: 'redirect',
    onSuccess: async (codeResponse) => {
      const qs = `code=${encodeURIComponent(codeResponse.code)}
        &scope=${encodeURIComponent(codeResponse.scope)}
        &authuser=${encodeURIComponent(codeResponse.authuser)}
        &prompt=${encodeURIComponent(codeResponse.prompt)}`;
      await apiClient.get(`/auth/google/callback?${qs}`);
    },
    onError: () => {},
  });

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await login({
        email: inputs.email,
        password: inputs.password
      });

      setToken(response.token);
      persistAuthToken(response.token);
      
      const me = await apiClient.get('/me')
      setUserData(me)
      
      return navigate('/');
    } catch {
      alert('Login incorrect')
    }
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
    await apiClient.post(`/members`, formData)
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
        <Link to="/">
          <img src="images/logoChaye.png" alt="Chaye" />
        </Link>
      </section>
      <section className={`container container-login forms`}>
        <div className={`form login ${showSignUp ? 'd-none' : ''}`}>
          <div className="form-content">
            <header>
              <h2>Content de te revoir</h2>
              <h4 style={{ fontSize: '17px!important', fontFamily: 'Poppins, sans-serif' }} >Connectez-vous à votre compte</h4>

            </header>
            <form onSubmit={handleLogin}>
              <div className="field input-field">
                <input type="email" name="email" placeholder="Email" className="input" onChange={handleChange} />
              </div>

              <div className="field input-field">
                <input type="password" name="password" placeholder="Mot de passe" className="password" onChange={handleChange} />
                <i class='bx bx-hide eye-icon'></i>
              </div>

              <div className="form-link" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>  <input type="checkbox" id="scales" name="scales" defaultChecked /> <span className="serappeller">Se rappeler de moi</span></div>
                <div> <button type="button" className="forgot-pass">Mot de passe oublié</button></div>

              </div>

              <div className="field button-field">
                <button className="btnValider">Valider</button>
              </div>
            </form>

            <div className="form-link">
              <span>Vous n’avez pas de compte ? <button type="button" onClick={toggleSignup} className="link signup-link"> Créer votre  compte </button></span>
            </div>
          </div>

          <div className="line"></div>

          <div className="media-options">
            <button type="button" className="field facebook">
              <i class='bx bxl-facebook facebook-icon'></i>
              <span>Se connecter avec Facebook</span>
            </button>
          </div>

          <div className="media-options">
            <button type="button" onClick={() => googleLogin()} className="field google">
              <img src="images/google.png" alt="" className="google-img" />
              <span>Se connecter avec Google</span>
            </button>
          </div>
          <div className="media-options">
            <button type="button" className="field apple">
              <i class='bx bxl-apple apple-icon'></i>
              <span>Se connecter avec Apple</span>
            </button>
          </div>

        </div>

        {/* <!-- Signup Form --> */}

        <div className={`form signup ${showSignUp ? '' : 'd-none'}`}>
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
                <input type=" " placeholder="Créer votre mot de passe" className="password" name="password" onChange={handleChange} />
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
              <span>Vous avez déjà un compte ? <button type="button" onClick={toggleSignup} className="link login-link">Se connecter</button></span>
            </div>
          </div>

          <div className="line"></div>

          <div className="media-options">
            <button type="button" className="field facebook">
              <i class='bx bxl-facebook facebook-icon'></i>
              <span>Se connecter avec Facebook</span>
            </button>
          </div>

          <div className="media-options">
            <button type="button" onClick={() => googleLogin()} className="field google">
              <img src="images/google.png" alt="" className="google-img" />
              <span>Se connecter avec Google</span>
            </button>
          </div>

          <div className="media-options">
            <button type="button" className="field apple">
              <i class='bx bxl-apple apple-icon'></i>
              <span>Se connecter avec Apple</span>
            </button>
          </div>

        </div>
      </section>
    </div >
  );
}

export default Login;
