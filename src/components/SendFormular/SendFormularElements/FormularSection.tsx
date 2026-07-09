import BTNPublisher from './BTNPublisher';
import SendFormularModal from './SendFormularModal';

const FormularSection = () => {
  return (
    <section className="section gray-bg" id="blog">
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="blog-grid">
              <div className="blog-info">
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Contenu du colis*"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Poids du colis en Kg *"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Longueur du colis*"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Largeur  du colis*"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Profondeur du colis"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Prix proposé*"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Date limite d'expédition *"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Importer une image (jpg, png, heic)"
                  />
                </div>

                <BTNPublisher />
                <SendFormularModal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FormularSection;
