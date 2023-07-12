import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

import '../styles/styles.css';

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
    <div className="content">
    <div className="Formulcontainer">
       <h1>Ajouter un colis</h1> 
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Contenu:</label>
          <input type="text" id="input"  onChange={handleContentChange} />
        </Form.Field>

        <Form.Field>
          <label>Poids:</label>
          <input type="string"  id="input" onChange={handleWeightChange}/>
        </Form.Field>

        <Form.Field>
          <label>Taille:</label>
          <input type="string" id="input"  onChange={handleSizeChange}/>
        </Form.Field>
        <Form.Field>
          <label>Ville de départ:</label>
          <input type="text" id="input"  onChange={handleDepartureCityChange} />
        </Form.Field>
        <Form.Field>
          <label>Photo de contenu du colis :</label>
          <input type="file"  id="input" onChange={handleFileChange} />
        </Form.Field>
        <Button id="btn" primary type="submit">Ajouter</Button>
      </Form>
    </div>
    </div>
  );
}

export default AddPackage;
