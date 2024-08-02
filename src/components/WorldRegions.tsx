import React from 'react';

const WorldRegions = () => {
  return (
    <div className="container">
      <h2 className="txtLeft margin-top-36">Les Régions du monde</h2>
      <div className="container">
        <div className="row cat-layout margin-top-25">
          <div className="col">
            <a href="single.html" className="h-entry mb-30 v-height gradient">
              <div
                className="featured-img"
                style={{ backgroundImage: `url('images/caraibes.png')` }}
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
                style={{ backgroundImage: `url('images/europe.png')` }}
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
                style={{ backgroundImage: `url('images/amerique.png')` }}
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
                style={{ backgroundImage: `url('images/afrique.png')` }}
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
                style={{ backgroundImage: `url('images/asie.png')` }}
              ></div>

              <div className="text">
                <h2>Asie</h2>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldRegions;
