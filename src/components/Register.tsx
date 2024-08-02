import SignInOrUpBy from './SignInOrUpBy';
import '../../public/css/reset.css';
import '../../public/css/loginSingup.css';
import LogoChayeSection from './LogoChayeSection';

const Register = () => {
  return (
    <>
      <LogoChayeSection />
      <section className="container forms">
        <div className="form signup">
          <div className="form-content">
            <header>
              {' '}
              <h2>S’enregistrer</h2>
              <h4
                style={{
                  fontSize: '17px!important',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Créez votre nouveau compte
              </h4>
            </header>
            <form action="#">
              <div className="field input-field">
                <input type="Name" placeholder="Prénom" className="input" />
              </div>

              <div className="field input-field">
                <input type="FirstName" placeholder="Nom" className="input" />
              </div>

              <div className="field input-field">
                <input
                  type="Birthday"
                  placeholder="Date de naissance"
                  className="input"
                />
              </div>

              <div className="field input-field">
                <input type="Flag" placeholder="Pays" className="input" />
              </div>
              <div className="field input-field">
                <input type="email" placeholder="Email" className="input" />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Créer votre mot de passe"
                  className="password"
                />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Confirmer votre mot de passe"
                  className="password"
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div className="field button-field">
                <button className="btnValider">Valider</button>
              </div>
            </form>

            <div className="form-link">
              <span>
                Vous avez déjà un compte ?{' '}
                <a href="/login" className="link login-link">
                  Se connecter
                </a>
              </span>
            </div>
          </div>
          <SignInOrUpBy />
        </div>
      </section>

      {/* <!-- JavaScript --> */}
      {/* <script src="js/script.js"></script> */}
    </>
  );
};

export default Register;
