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
                  <a className="btnChaye" href="/sender">
                    J'expédie
                  </a>
                </div>
                <div className="col-4">
                  <a className="btnChaye" href="/carrier">
                    Je transporte
                  </a>
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
