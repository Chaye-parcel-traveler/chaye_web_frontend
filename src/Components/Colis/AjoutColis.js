import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

import '../styles/styles.css';

function AddColis() {
  let navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [contenu, setContenu] = useState('');
  const [largeur, setLargeur] = useState('');
  const [longueur, setLongueur] = useState('');
  const [profondeur, setProfondeur] = useState('');
  const [dateLimiteExpedition, setdateLimiteExpedition] = useState('');
  const [photo, setPhoto] = useState('');
  const [villeDepart, setVilleDepart] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setPhoto(event.target.files[0].name);
  };

  const handleContenuChange = (event) => {
    setContenu(event.target.value);
  };

  const handleLargeurChange = (event) => {
    setLargeur(event.target.value);
  };

  const handleLongueurChange = (event) => {
    setLongueur(event.target.value);
  };

  const handleProfondeurChange = (event) => {
    setProfondeur(event.target.value);
  };

  const handledateLimiteExpeditionChange = (event) => {
    setdateLimiteExpedition(event.target.value);
  };

  const handleVilleDepartChange = (event) => {
    setVilleDepart(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contenu', contenu);
      formData.append('largeur', largeur);
      formData.append('longueur', longueur);
      formData.append('profondeur', profondeur);
      formData.append('dateLimiteExpedition', dateLimiteExpedition);
      formData.append('villeDepart', villeDepart);
      formData.append('photo', photo);
      axios
        .post(`http://localhost:5000/api/submitcolis`, formData ,{withCredentials:true})
        .then((response) => {
          console.log(response.data);
          return navigate("/accueil");
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
          <input type="text" id="input"  onChange={handleContenuChange} />
        </Form.Field>

        <Form.Field>
          <label>Largeur:</label>
          <input type="string"  id="input" onChange={handleLargeurChange} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Longueur:</label>
          <input type="string" id="input"  onChange={handleLongueurChange} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Profondeur:</label>
          <input type="string" id="input"  onChange={handleProfondeurChange} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Date limite d'expédition:</label>
          <input type="date" id="input"  onChange={handledateLimiteExpeditionChange} />
        </Form.Field>

        <Form.Field>
          <label>Ville de départ:</label>
          <input type="text" id="input"  onChange={handleVilleDepartChange} />
        </Form.Field>

        <Form.Field>
          <label>Photo:</label>
          <input type="file"  id="input" onChange={handleFileChange} />
        </Form.Field>

        <Button id="btn" primary type="submit">Ajouter</Button>
      </Form>
    </div>
    </div>
  );
}

export default AddColis;
