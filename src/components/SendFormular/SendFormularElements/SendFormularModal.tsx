const SendFormularModal = () => {
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-md  modal-dialog-centered"
        role="document"
      >
        <div
          className="modal-content rounded-0"
          style={{ padding: '38px', borderRadius: '30px!important' }}
        >
          <div className="modal-body py-0">
            <div className="d-block main-content">
              <img
                src="images/logo-chaye-pop.svg"
                alt="Chaye"
                className="img-fluid"
                style={{ display: 'block', margin: '0 auto' }}
              />

              <div className="content-text p-4">
                <h3
                  style={{
                    color: '#4F4294',
                    textAlign: 'center',
                    fontFamily: 'Raleway',
                    fontSize: '62px',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    lineHeight: 'normal',
                  }}
                >
                  Merci
                </h3>

                <p
                  className="mb-4"
                  style={{
                    color: '#000',
                    fontFamily: 'Raleway',
                    fontSize: '32px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '179.9%',
                  }}
                >
                  Chayé vous remercie
                </p>

                <div className="d-flex">
                  <div className="ml-auto" style={{ margin: '0 auto' }}>
                    {/* <a href="#" className="btn btn-link" data-dismiss="modal">Fermer</a> */}
                    <a
                      href="index.html"
                      className="btn btn-primary px-4"
                      style={{ background: '#ec634e!important', border: '0px' }}
                    >
                      Revenir sur l’accueil
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendFormularModal;
