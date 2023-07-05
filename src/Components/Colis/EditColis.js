import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

function EditColis() {
  let navigate = useNavigate();
  const params = useParams();

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

  useEffect((id) => {
    axios
      .get(`http://localhost:5000/editcolis/${id}`, { withCredentials: true })
      .then((response) => {
        setContenu(response.data.contenu);
        setLargeur(response.data.largeur);
        setLongueur(response.data.longueur);
        setProfondeur(response.data.profondeur);
        setdateLimiteExpedition(response.data.dateLimiteExpedition);
        setVilleDepart(response.data.villeDepart);
        setPhoto(response.data.photo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  const handleSubmit = (event) => {
    event.preventDefault();
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
      .put(`http://localhost:5000/editcolis/${params.id}`, formData)
      .then((response) => {
        console.log(response.data);
        return navigate('/accueil');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="Formulcontainer">
      <h1>Modifier un colis</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Contenu:</label>
          <input type="text" id="input" onChange={handleContenuChange} value={contenu} />
        </Form.Field>

        <Form.Field>
          <label>Largeur:</label>
          <input type="string" id="input" onChange={handleLargeurChange} value={largeur} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Longueur:</label>
          <input type="string" id="input" onChange={handleLongueurChange} value={longueur} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Profondeur:</label>
          <input type="string" id="input" onChange={handleProfondeurChange} value={profondeur} placeholder="cm" />
        </Form.Field>

        <Form.Field>
          <label>Date limite d'expédition:</label>
          <input type="date" id="input" onChange={handledateLimiteExpeditionChange} value={dateLimiteExpedition} />
        </Form.Field>

        <Form.Field>
          <label>Ville de départ:</label>
          <input type="text" id="input" onChange={handleVilleDepartChange} value={villeDepart} />
        </Form.Field>

        <Form.Field>
          <label>Photo:</label>
          <input type="file" id="input" onChange={handleFileChange} />
        </Form.Field>
        <img src={`http://localhost:5000/${photo}`} width="150px" alt="imageColis" />

        <Button id="btn" type="submit">
          Ajouter
        </Button>
      </Form>
    </div>
  );
}

export default EditColis;
