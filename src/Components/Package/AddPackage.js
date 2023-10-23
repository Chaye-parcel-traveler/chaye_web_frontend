import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Header from '../Header/Header';

function AddPackage() {
  let navigate = useNavigate();
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    // await axios.post('/announcements', inputs);
    // navigate('/announcements')
  }

  return (
    <div className='content'>
      <div className="content-body">
        <Header />
        <div className="container">

          <div className="box-chaye margin-top-25 bgPurple" style={{ position: 'relative' }}>
            <h2 className="txtCenter margin-top-36 txtwhite margin-bottom-40 ">J’expédie un colis</h2>
            <div className="displayFlex ">
              <div className="container">

                <div className="DisplayVol">

                  <div>
                    <div className="setting-description p-2">
                      <div className="setting-description-text mb-3" style={{ marginLeft: '15px' }}>
                        <h1>Départ de</h1>
                      </div>
                    </div>
                    <div className="wrapper-dropdown" id="dropdown">
                      <input className="form-control" list="datalistOptions" name='departing_from' placeholder="Fort de France" onChange={handleChange}/>
                      <datalist id="datalistOptions">
                        <option value="Fort de France" />
                        <option value="San Francisco" />
                        <option value="New York" />
                        <option value="Seattle" />
                        <option value="Los Angeles" />
                        <option value="Chicago" />
                      </datalist>
                      {/* <span className="selected-display" id="destination">Guadeloupe</span>
                      <svg className="arrow" id="drp-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all ml-auto rotate-180">
                        <path d="M7 14.5l5-5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                      <ul className="dropdown">
                        <li className="item">Option 1</li>
                        <li className="item">Option 2</li>
                        <li className="item">Option 3</li>
                        <li className="item">Option 4</li>
                      </ul> */}
                    </div>
                  </div>

                  <div>
                    <div className="setting-description p-2">
                      <div className="setting-description-text mb-3" style={{ marginLeft: '15px' }}>
                        <h10>Arrivée à :</h10>
                      </div>
                    </div>
                    <div className="wrapper-dropdown" id="dropdown">
                      <input className="form-control" list="datalistOptions" name='arriving_at' placeholder="Paris" onChange={handleChange}/>
                      <datalist id="datalistOptions">
                        <option value="Paris" />
                        <option value="Fort de France" />
                        <option value="San Francisco" />
                        <option value="New York" />
                        <option value="Seattle" />
                        <option value="Los Angeles" />
                      </datalist>
                      {/* <span className="selected-display" id="destination">Paris</span>
                      <svg className="arrow" id="drp-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all ml-auto rotate-180">
                        <path d="M7 14.5l5-5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                      <ul className="dropdown">
                        <li className="item">Special Option 1</li>
                        <li className="item">Special Option 2</li>
                        <li className="item">Special Option 3</li>
                        <li className="item">Special Option 4</li>
                      </ul> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
        <section className="section gray-bg" id="blog">
          <div className="container">

            <div className="row">
              <div className="col">
                <div className="blog-grid">

                  <div className="blog-info mt-n2">
                    <div className="mb-3">

                      <input type="text" name="description" className="form-control"  aria-describedby="emailHelp" placeholder="Contenu du colis*" />

                    </div>
                    <div className="mb-3">

                      <input type="text" name="weight" className="form-control"  aria-describedby="emailHelp" placeholder="Poids du colis en Kg *" />

                    </div>
                    <div className="mb-3">

                      <input type="text" name="long" className="form-control"  aria-describedby="emailHelp" placeholder="Longueur du colis*" />

                    </div>
                    <div className="mb-3">
                      <input type="text" name="lar" className="form-control"  aria-describedby="emailHelp" placeholder="Largeur  du colis*" />

                    </div>
                    <div className="mb-3">

                      <input type="text" name="prof" className="form-control" aria-describedby="emailHelp" placeholder="Profondeur du colis" />

                    </div>
                    <div className="mb-3">

                      <input type="number" name="price" className="form-control" aria-describedby="emailHelp" placeholder="Prix proposé*  " />

                    </div>
                    <div className="mb-3">

                      <input type="date" name="long" className="form-control" aria-describedby="emailHelp" placeholder="Date limite d'expédition *" />

                    </div>
                    <div className="container content mt-2">
                      <div className="row align-items-center content">

                        <div className="col-12 text-center">

                          <button type="button" onClick={handleSubmit} className="btn btn-secondary px-4 py-3">
                            Publier votre annonce
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div >
    </div >
  );
}

export default AddPackage;