import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import Navbar from '../NavBar/NavBar';

import '../styles/styles.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AddPackage() {
  let navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [picture, setPicture] = useState('');
  const [departureCity, setDepartureCity] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPicture(event.target.files[0].name);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };
  const handleDepartureCityChange = (event) => {
    setDepartureCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('content', content);
      formData.append('weight', weight);
      formData.append('size', size);
      formData.append('departureCity', departureCity);
      formData.append('picture', picture);
      axios
        .post(`http://localhost:5000/package`, formData ,{withCredentials:true})
        .then((response) => {
          console.log(response.data);
          return navigate("/home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
  <div className='row'>
    <div className="col-2 ">
        <Navbar/>
    </div>
    <div className="col-10 ">
    <Header/>
       <h1  className="text-center pt-5 fs-2 fw-bold" >J'expédier un colis</h1> 
       <div className=' col-6 d-flex m-auto '>
       <input type="text" className="form-control me-5 py-3"  onChange={handleDepartureCityChange} placeholder='Départ de ' />
       <input type="text" className="form-control py-3"  onChange={handleDepartureCityChange} placeholder='Arrivé à ' />
       </div>
      <Form  className="col-formule bg-white container-fluid col-4 my-3 " onSubmit={handleSubmit}>
        <Form.Field>
          <label className="form-label">Contenu:</label>
          <input type="text" className="form-control"  onChange={handleContentChange} />
        </Form.Field>

        <Form.Field>
          <label className="form-label">Poids:</label>
          <input type="string"  className="form-control" onChange={handleWeightChange}/>
        </Form.Field>

        <Form.Field>
          <label className="form-label">Taille:</label>
          <input type="string" className="form-control"  onChange={handleSizeChange}/>
        </Form.Field>
        <Form.Field>
          <label className="form-label">Ville de départ:</label>
          <input type="text" className="form-control"  onChange={handleDepartureCityChange} />
        </Form.Field>
        <Form.Field>
          <label className="form-label">Photo de contenu du colis :</label>
          <input type="file"  className="form-control" onChange={handleFileChange} />
        </Form.Field>
        <Button id="btn" primary type="submit">Ajouter</Button>
      </Form>
      <Footer/>
    </div>
  </div>
  );
}

export default AddPackage;
