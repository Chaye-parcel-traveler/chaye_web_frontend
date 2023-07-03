import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';

function EditMember() {
  let navigate = useNavigate();
  const params = useParams();
  const [file, setFile] = useState(null);
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adress, setAdress] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');
  const [imagename, setImagename] = useState('');

  const handelFileChange = (event) => {
    setFile(event.target.files[0]);
    setImagename(event.target.files[0].name);
  };

  const handelLastnameChange = (event) => {
    setLastname(event.target.value);
  };

  const handelFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handelEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handelPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handelAdressChange = (event) => {
    setAdress(event.target.value);
  };

  const handelPhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handelStatusChange = (event) => {
    setStatus(event.target.value);
  };


  useEffect(() => {
    axios
      .get(`http://localhost:5000/editMembre/${params.id}`)
      .then((response) => {
        setLastname(response.data.lastname);
        setFirstname(response.data.firstname);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setAdress(response.data.adress);
        setPhone(response.data.phone);
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
      formData.append('lastname', lastname);
      formData.append('firstname', firstname);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('adress', adress);
      formData.append('phone', phone);
      formData.append('status', status);
      formData.append('imagename', imagename);

      axios
        .put(`http://localhost:5000/editMember/${params.id}`, formData)
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
          <input type="text" name="lastname" id="input" onChange={handelLastnameChange} value={lastname} />
        </Form.Field>

        <Form.Field>
          <label>Prénom</label>
          <input type="text" name="firstname" id="input" onChange={handelFirstnameChange} value={firstname} />
        </Form.Field>

        <Form.Field>
          <label>Email</label>
          <input type="email" name="email" id="input" onChange={handelEmailChange} value={email} />
        </Form.Field>

        <Form.Field>
          <label>Mot de passe</label>
          <input type="password" name="password" id="input" onChange={handelPasswordChange}  />
        </Form.Field>

        <Form.Field>
          <label>Adresse</label>
          <input type="text" name="adress" id="input" onChange={handelAdressChange} value={adress} />
        </Form.Field>

        <Form.Field>
          <label>Téléphone</label>
          <input type="text" name="phone" id="input" onChange={handelPhoneChange} value={phone} />
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

export default EditMember;
