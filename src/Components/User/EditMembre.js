import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

function EditeMembre() {
  let navigate = useNavigate();
  const params = useParams();
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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/editMembre/${params.id}`)
      .then((response) => {
        setNom(response.data.nom);
        setPrenom(response.data.prenom);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setAdresse(response.data.adresse);
        setTelephone(response.data.telephone);
        setStatus(response.data.status);
        setImagename(response.data.imagename);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
        .put(`http://localhost:5000/editMembre/${params.id}`, formData)
        .then((response) => {
          console.log(response.data);
          return navigate('/allmembres');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div className='Formulcontainer '>
      <h1>Modifier votre Profil</h1>
      <Form onSubmit={handelSubmit}>
        <input type="hidden" name="_method" value="PUT" />

        <Form.Field>
          <label>Nom</label>
          <input type="text" name="nom" id="input" onChange={handelNomChange} value={nom} />
        </Form.Field>

        <Form.Field>
          <label>Prénom</label>
          <input type="text" name="prenom" id="input" onChange={handelPrenomChange} value={prenom} />
        </Form.Field>

        <Form.Field>
          <label>Email</label>
          <input type="email" name="email" id="input" onChange={handelEmailChange} value={email} />
        </Form.Field>

        <Form.Field>
          <label>Mot de passe</label>
          <input type="password" name="password" id="input" onChange={handelPasswordChange} />
        </Form.Field>

        <Form.Field>
          <label>Adresse</label>
          <input type="text" name="adresse" id="input" onChange={handelAdresseChange} value={adresse} />
        </Form.Field>

        <Form.Field>
          <label>Téléphone</label>
          <input type="text" name="telephone" id="input" onChange={handelTelephoneChange} value={telephone} />
        </Form.Field>

        <Form.Field>
          <label>Status</label>
          <select name="status" id="input" onChange={handelStatusChange} value={status}>
            <option>Sélectionnez votre status</option>
            <option value="Expéditeur">Expéditeur</option>
            <option value="Voyageur">Voyageur</option>
          </select>
        </Form.Field>

        <Form.Field>
          <label>Photo</label>
          <input type="file" id="input" onChange={handelFileChange}/>
          <img src={`http://localhost:5000/${imagename}`} width="150px" alt="Profil" />
        </Form.Field>

        <Button id="btn" type="submit">Valider</Button>
      </Form>
    </div>
  );
}

export default EditeMembre;
