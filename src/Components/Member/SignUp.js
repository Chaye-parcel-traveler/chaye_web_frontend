import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';
function SignUp() {
  let navigate = useNavigate();
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
      .post(`/SignUp`, formData)
      .then((response) => {
        console.log(response.data);
        return navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className="Formulcontainer mt-5 col-5 m-auto">
     <div className=" m-5">
        <div className='text-center mt-5'>
          <h1 >S'enregistrer</h1>
          <h3>Créez votre nouveau compte</h3>
        </div>
        <form  onSubmit={handelSubmit}>
          <div className="mb-3 ">
            <label className="fst-italic">Nom</label>
            <input type="text" className="form-control " name="lastname"  onChange={handelLastnameChange} />
          </div>
          <div className="mb-3">
            <label className="fst-italic">Prénom</label>
            <input type="text" className="form-control" name="firstname"  onChange={handelFirstnameChange} />
          </div>
          <div className="mb-3">
            <label className="fst-italic">Email</label>
            <input type="email" className="form-control" name="email"  onChange={handelEmailChange} />
          </div>
          
            <div className="mb-3">
              <label className="fst-italic">Mot de passe</label>
              <input type="password" className="form-control" name="password"  onChange={handelPasswordChange} />
            </div>
            <div className="mb-3">
              <label className="fst-italic">Adress</label>
              <input type="text" className="form-control" name="adress"  onChange={handelAdressChange} />
            </div>
            <div className="mb-3">

              <label className="fst-italic">Téléphone</label>
              <input type="text" className="form-control" name="phone"  onChange={handelPhoneChange} />
            </div>
            <div className="mb-3">

              <label className="fst-italic">Status</label>
              <select name="status" className="form-select" onChange={handelStatusChange}>
                <option>Sélectionnez votre status</option>
                <option>Expéditeur</option>
                <option>Voyageur</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="fst-italic">Photo</label>
              <input type="file" className="form-control" onChange={handelFileChange} />
            </div>
            <div className='button'>
            <Button id="btn" type="submit">Valider</Button>
            </div>
        </form>
      </div>
      </div>
    
  );
}

export default SignUp;
