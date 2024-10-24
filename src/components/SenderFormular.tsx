import React from 'react'
import ChoiceCarrierOrSender from './ChoiceCarrierOrSender'

const SenderFormular = () => {
  return (
    <>
      <ChoiceCarrierOrSender />
      <div className="container">

        <div className="box-chaye margin-top-25 bgPurple" 
          style={{ position: 'relative' }}>
          <h2 className="txtCenter margin-top-36 txtwhite margin-bottom-40 ">J’expédie un colis</h2>

          <div className="displayFlex ">
            <div className="container">
              <div className="DisplayVol">      

                <div>
                  <div className="setting-description">
                    <div className="setting-description-text" 
                      style={{ marginLeft: '15px' }}>
                      <h4>Départ de:</h4>
                    </div>
                  </div>
                  <div className="wrapper-dropdown" id="dropdown">
                    <span className="selected-display" id="destination">Guadeloupe</span>
                    <svg className="arrow" id="drp-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all ml-auto rotate-180">
                      <path d="M7 14.5l5-5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <ul className="dropdown">
                      <li className="item">Option 1</li>
                      <li className="item">Option 2</li>
                      <li className="item">Option 3</li>
                      <li className="item">Option 4</li>
                    </ul>
                  </div>
                </div>

                <div>

                  <div className="setting-description">
                    <div className="setting-description-text" 
                      style={{ marginLeft: '15px' }}>
                      <h4>Arrivée à :</h4>
                    </div>
                  </div>

                  <div className="wrapper-dropdown" id="dropdown">
                    <span className="selected-display" id="destination">Paris</span>

                    <svg className="arrow" id="drp-arrow" width="24" 
                      height="24" viewBox="0 0 24 24" fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="transition-all ml-auto rotate-180">
                      <path d="M7 14.5l5-5 5 5" stroke="currentColor" 
                        stroke-width="1.5" stroke-linecap="round" 
                        stroke-linejoin="round">
                      </path>
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
      </div>

      <section className="section gray-bg" id="blog">
        <div className="container">

          <div className="row">
            <div className="col">
              <div className="blog-grid">

                <div className="blog-info">

                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Contenu du colis*" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Poids du colis en Kg *" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Longueur du colis*" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Largeur  du colis*" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Profondeur du colis" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Prix proposé*" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Date limite d'expédition *" />
                  </div>
                  <div className="mb-3">
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Importer une image (jpg, png, heic)" />
                  </div>

                  <div className="container content" style={{ marginTop: '25px' }}>
                    <div className="row align-items-center content">

                      <div className="col-12 text-center">
                        <button type="button" className="btn btn-secondary px-4 py-3" data-toggle="modal" data-target="#exampleModalCenter">
                          Publier votre annonce
                        </button>
                      </div>

                    </div>
                  </div>

                  <div className="modal fade" id="exampleModalCenter" tabIndex={ -1 } role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-md  modal-dialog-centered" role="document">
                      <div className="modal-content rounded-0" 
                      style={{ padding: '38px',borderRadius: '30px!important' }}>
                        <div className="modal-body py-0">            
                          <div className="d-block main-content">
                            <img src="images/logo-chaye-pop.svg" alt="Image" 
                              className="img-fluid" 
                              style={{ display: 'block',margin: '0 auto' }} />

                            <div className="content-text p-4">
                              <h3 style={{
                                color: '#4F4294',
                                textAlign: 'center',
                                fontFamily: 'Raleway',
                                fontSize: '62px',
                                fontStyle: 'normal',
                                fontWeight: '700',
                                lineHeight: 'normal'
                              }}>Merci</h3>

                              <p className="mb-4" 
                                style={{ 
                                  color: '#000',
                                  fontFamily: 'Raleway',
                                  fontSize: '32px',
                                  fontStyle: 'normal',
                                  fontWeight: '400',
                                  lineHeight: '179.9%' 
                                }}
                              >Chayé vous remercie</p>

                              <div className="d-flex">
                                <div className="ml-auto" style={{margin: '0 auto'}}>
                                  {/* <a href="#" className="btn btn-link" data-dismiss="modal">Fermer</a> */}
                                  <a href="index.html" className="btn btn-primary px-4" 
                                    style={{background:'#ec634e!important', border: '0px' }}
                                  >Revenir sur l’accueil</a>
                                </div>
                              </div>

                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                              
                </div>

              </div>
            </div>
          </div>
                              
        </div>
      </section>
    </>
  )
}

export default SenderFormular