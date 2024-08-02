import LogoChayeSection from './LogoChayeSection';
import SignInOrUpBy from './SignInOrUpBy';

const Login = () => {
  return (
    <>
      <LogoChayeSection />
      <section className="container forms">
        <div className="form login">
          <div className="form-content">
            <header>
              <h2>Content de te revoir</h2>
              <h4
                style={{
                  fontSize: '17px!important',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Connectez-vous à votre compte
              </h4>
            </header>
            <form action="#">
              <div className="field input-field">
                <input type="email" placeholder="Email" className="input" />
              </div>

              <div className="field input-field">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  className="password"
                />
                <i className="bx bx-hide eye-icon"></i>
              </div>

              <div
                className="form-link"
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <div>
                  {' '}
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    checked
                  />{' '}
                  <span className="serappeller">Se rappeler de moi</span>
                </div>
                <div>
                  {' '}
                  <a href="#" className="forgot-pass">
                    Mot de passe oublié
                  </a>
                </div>
              </div>

              <div className="field button-field">
                <button className="btnValider">
                  <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>
                    Valider
                  </a>
                </button>
              </div>
            </form>

            <div className="form-link">
              <span>
                Vous n’avez pas de compte ?
                <a href="#" className="link signup-link">
                  {' '}
                  Créer votre compte{' '}
                </a>
              </span>
            </div>
          </div>
          <SignInOrUpBy />
        </div>
      </section>
    </>
  );
};

export default Login;
