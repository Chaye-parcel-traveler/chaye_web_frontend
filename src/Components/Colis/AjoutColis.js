import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import '../styles/styles.css';

function AddColis() {
  const [file, setFile] = useState(null);
  const [contenu, setContenu] = useState('');
  const [largeur, setLargeur] = useState('');
  const [longueur, setLongueur] = useState('');
  const [profondeur, setProfondeur] = useState('');
  const [dateLimite, setDateLimite] = useState('');
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

  const handleDateLimiteChange = (event) => {
    setDateLimite(event.target.value);
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
      formData.append('dateLimite', dateLimite);
      formData.append('villeDepart', villeDepart);
      formData.append('photo', photo);
      axios
        .post(`http://localhost:5000/api/submitcolis`, formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
   
    <div className="center-container">
       <h1>Ajouter un colis</h1> 
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Contenu:</label>
          <input type="text" onChange={handleContenuChange} />
        </Form.Field>

        <Form.Field>
          <label>Largeur:</label>
          <input type="string" onChange={handleLargeurChange} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Longueur:</label>
          <input type="string" onChange={handleLongueurChange} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Profondeur:</label>
          <input type="string" onChange={handleProfondeurChange} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Date limite d'expédition:</label>
          <input type="date" onChange={handleDateLimiteChange} />
        </Form.Field>

        <Form.Field>
          <label>Ville de départ:</label>
          <input type="text" onChange={handleVilleDepartChange} />
        </Form.Field>

        <Form.Field>
          <label>Photo:</label>
          <input type="file" onChange={handleFileChange} />
        </Form.Field>

        <Button primary type="submit">Ajouter</Button>
      </Form>
    </div>
  );
}

export default AddColis;
