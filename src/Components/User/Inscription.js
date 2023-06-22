import React, { useState } from 'react';
import { Form, Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
function Inscription() {
  let navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adresse, setAdresse] = useState('');
  const [telephone, setTelephone] = useState('');
  const [status, setStatus] = useState('');
  const [imagename, setImagename] = useState('');

  const handelFileChange = (event) => {
    setFile(event.target.files[0]);
    setImagename(event.target.files[0].name);
  };

  const handelNomChange = (event) => {
    setNom(event.target.value);
  };

  const handelPrenomChange = (event) => {
    setPrenom(event.target.value);
  };

  const handelEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handelPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handelAdresseChange = (event) => {
    setAdresse(event.target.value);
  };

  const handelTelephoneChange = (event) => {
    setTelephone(event.target.value);
  };

  const handelStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handelSubmit = (event) => {
    event.preventDefault();

      const formData = new FormData();
      formData.append('file', file);
      formData.append('nom', nom);
      formData.append('prenom', prenom);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('adresse', adresse);
      formData.append('telephone', telephone);
      formData.append('status', status);
      formData.append('imagename', imagename);
      axios
        .post(`http://localhost:5000/api/submitInscription`, formData)
        .then((response) => {
          console.log(response.data);
          return navigate('/connexion');
        })
        .catch((error) => {
          console.log(error);
        });
    
  };

  return (
    <div className="bgimage">
      <div className="Formulcontainer ">
      <div>
        <h1>S'enregistrer</h1>
        <h3>Créez votre nouveau compte</h3>
      </div>
      
        <Form onSubmit={handelSubmit}>
          <Form.Field>
            <label>Nom</label>
            <Input type="text" name="nom" id="input" onChange={handelNomChange} className="center aligned" />
          </Form.Field>

          <Form.Field>
            <label>Prénom</label>
            <Input type="text" name="prenom" id="input" onChange={handelPrenomChange} className="center aligned" />
          </Form.Field>

          <Form.Field>
            <label>Email</label>
            <Input type="email" name="email" id="input" onChange={handelEmailChange} className="center aligned" />
          </Form.Field>

          <Form.Field>
            <label>Mot de passe</label>
            <Input type="password" name="password" id="input" onChange={handelPasswordChange} className="center aligned" />
          </Form.Field>

          <Form.Field>
            <label>Adresse</label>
            <Input type="text" name="adresse" id="input" onChange={handelAdresseChange} className="center aligned" />
          </Form.Field>

          <Form.Field>
            <label>Téléphone</label>
            <Input type="text" name="telephone" id="input" onChange={handelTelephoneChange} className="center aligned" />
          </Form.Field>

          <Form.Field id="input">
            <label>Status</label>
            <select name="status" onChange={handelStatusChange} className="center aligned">
              <option>Sélectionnez votre status</option>
              <option>Expéditeur</option>
              <option>Voyageur</option>
            </select>
          </Form.Field>

          <Form.Field>
            <label>Photo</label>
            <Input type="file" onChange={handelFileChange} className="center aligned" />
          </Form.Field>

          <Button id="btn" type="submit">Valider</Button>
        </Form>
      </div>
    </div>
  );
}

export default Inscription;
