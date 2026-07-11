const DepartureArrival = () => {
  return (
    <div className="displayFlex ">
      <div className="container">
        <div className="DisplayVol">
          <div className="travel-departure">
            <div className="setting-description">
              <div
                className="setting-description-text"
                style={{ marginLeft: '15px' }}
              >
                <h4>Départ de:</h4>
              </div>
            </div>
            <div className="wrapper-dropdown" id="dropdown">
              <span className="selected-display" id="destination">
                Guadeloupe
              </span>
              <svg
                className="arrow transition-all ml-auto rotate-180"
                id="drp-arrow"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 14.5l5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
              <ul className="dropdown">
                <li className="item">Option 1</li>
                <li className="item">Option 2</li>
                <li className="item">Option 3</li>
                <li className="item">Option 4</li>
              </ul>
            </div>
          </div>

          <div className="travel-arrival">
            <div className="setting-description">
              <div
                className="setting-description-text"
                style={{ marginLeft: '15px' }}
              >
                <h4>Arrivée à :</h4>
              </div>
            </div>

            <div className="wrapper-dropdown" id="dropdown">
              <span className="selected-display" id="destination">
                Paris
              </span>

              <svg
                className="arrow transition-all ml-auto rotate-180"
                id="drp-arrow"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 14.5l5-5 5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <ul className="dropdown">
                <li className="item">Special Option 1</li>
                <li className="item">Special Option 2</li>
                <li className="item">Special Option 3</li>
                <li className="item">Special Option 4</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartureArrival;
