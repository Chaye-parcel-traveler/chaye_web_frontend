import { NavLink } from 'react-router-dom';

const ChoiceCarrierOrSender = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          {/* <!--content title choix--> */}
          <div className="box-chaye margin-top-36">
            <h2>Que veux tu faire ?</h2>

            <div className="container">
              <div className="row justify-content-center">
                <div className="col-4">
                  <NavLink
                    className={({ isActive }) =>
                      `btnChaye${isActive ? ' btnChaye-active' : ''}`
                    }
                    to="/sender"
                  >
                    J'expédie
                  </NavLink>
                </div>
                <div className="col-4">
                  <NavLink
                    className={({ isActive }) =>
                      `btnChaye${isActive ? ' btnChaye-active' : ''}`
                    }
                    to="/carrier"
                  >
                    Je transporte
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
          {/* <!--fin content title choix--> */}
        </div>
      </div>
    </div>
  );
};

export default ChoiceCarrierOrSender;
