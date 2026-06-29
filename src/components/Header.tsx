import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {/*--content title choix--> */}
          <div className="box-chaye margin-top-36">
            <h2>Que veux tu faire ?</h2>

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-4">
                  <Link className="btnChaye" to="/packages/new">
                    J'expédie
                  </Link>
                </div>
                <div className="col-4">
                  <Link className="btnChaye" to="/announcements/new">
                    Je transporte
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/*--fin content title choix--> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
