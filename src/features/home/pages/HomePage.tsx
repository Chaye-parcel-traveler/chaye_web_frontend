import InsurancePanel from '../../insurance/components/InsurancePanel';

import Header from '../../../components/Header';
import AnnouncementCarousel from '../../announcements/components/AnnouncementCarousel';

function HomePage() {
  return (
    <div>
      <div className="text">Ouvrir le menu</div>

      {/*-- block video--> */}
      <div className="container">
        <div className="row">
          <div className="col">
            {/*--mettre la video--> */}
            <div className="box-video">
              <span className="box-text-video">le content video</span>
            </div>
            {/*--fin de mettre la video--> */}
          </div>
        </div>
      </div>
      {/*-- fin block video--> */}

      {/*-- block choix--> */}
      <Header />
      {/*-- fin block choix--> */}
      <InsurancePanel />
      {/*
                    <div className='d-flex justify-content-between'>
                        <h2 className='titre'>A la une</h2>
                        <h4 className='text-danger fw-bold text-decoration-underline'>Favoris</h4>
                    </div>
                    <FavoritesPage />

                    <div className="btnAnnonce">
                        <a href="/announcements" className="btn" >Voir tous les annonces</a>
                        <a href="/carte" className="btn" >Carte intéractive</a>
                    </div>
                    */}
      {/*---Block AlaUne-->*/}
      <AnnouncementCarousel />
      {/*---Block avis--*/}
      <div className="container">
        <h2 className="txtLeft margin-top-36">Avis</h2>
        <div className="box-chaye sansFond margin-top-25 ">
          {/* <CommentList /> */}
        </div>
      </div>

      {/* categories */}
      <div className="container">
        <h2 className="txtLeft margin-top-36">Catégories</h2>
        <div className="container">
          <div className="row cat-layout margin-top-25">
            <div className="col">
              <a href="single.html" className="h-entry mb-30 v-height gradient">
                <div
                  className="featured-img"
                  style={{ backgroundImage: `url("images/caraibes.png")` }}
                ></div>

                <div className="text">
                  <h2>Caraïbes</h2>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="single.html" className="h-entry mb-30 v-height gradient">
                <div
                  className="featured-img"
                  style={{ backgroundImage: `url("images/europe.png")` }}
                ></div>

                <div className="text">
                  <h2>Europe</h2>
                </div>
              </a>
            </div>
          </div>
          <div className="row cat-layout">
            <div className="col">
              <a href="single.html" className="h-entry mb-30 v-height gradient">
                <div
                  className="featured-img"
                  style={{ backgroundImage: `url("images/amerique.png")` }}
                ></div>

                <div className="text">
                  <h2>Amérique</h2>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="single.html" className="h-entry mb-30 v-height gradient">
                <div
                  className="featured-img"
                  style={{ backgroundImage: `url("images/afrique.png")` }}
                ></div>

                <div className="text">
                  <h2>Afrique</h2>
                </div>
              </a>
            </div>
            <div className="col">
              <a href="single.html" className="h-entry mb-30 v-height gradient">
                <div
                  className="featured-img"
                  style={{ backgroundImage: `url("images/asie.png")` }}
                ></div>

                <div className="text">
                  <h2>Asie</h2>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
