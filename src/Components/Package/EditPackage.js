import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

function EditColis() {
  let navigate = useNavigate();
  const params = useParams();
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


  useEffect(() => {
    axios
      .get(`http://localhost:5000/editcolis/${params.id}`, { withCredentials: true })
      .then((response) => {
        setContent(response.data.content);
        setWeight(response.data.weight);
        setSize(response.data.size);
        setDepartureCity(response.data.departureCity);
        setPicture(response.data.picture);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('content', content);
    formData.append('weight', weight);
    formData.append('size', size);
    formData.append('departureCity', departureCity);
    formData.append('picture', picture);

    axios
      .put(`http://localhost:5000/editpackage/${params.id}`, formData)
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
          <input type="text" id="input" onChange={handleContentChange} value={content} />
        </Form.Field>

        <Form.Field>
          <label>Poids:</label>
          <input type="string" id="input" onChange={handleWeightChange} value={weight}/>
        </Form.Field>

        <Form.Field>
          <label>Taille:</label>
          <input type="string" id="input" onChange={handleSizeChange} value={size} />
        </Form.Field>
        <Form.Field>
          <label>Ville de départ:</label>
          <input type="text" id="input" onChange={handleDepartureCityChange} value={departureCity} />
        </Form.Field>

        <Form.Field>
          <label>Photo de contenu du colis ::</label>
          <input type="file" id="input" onChange={handleFileChange} />
        </Form.Field>
        <img src={`http://localhost:5000/${picture}`} width="150px" alt="imageColis" />

        <Button id="btn" type="submit">
          Ajouter
        </Button>
      </Form>
    </div>
  );
}

export default EditColis;
