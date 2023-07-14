import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';
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
      .post(`http://localhost:5000/SignUp`, formData)
      .then((response) => {
        console.log(response.data);
        return navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className=" Bg">
        <div className=" d-flex justify-content-center">
        <a href="/"><img src={"img/logo.png"} alt="Logo" className="Logo" /></a>
      </div>
      <div className="formule bg-white container-fluid col-4 my-3 ">
      <div className="m-5 ">
        <div className='text-center mt-5'>
          <h1 className="text-center pt-5 fw-bold">S'enregistrer</h1>
          <p className="text-center ">Créez votre nouveau compte</p>
        </div>
        <form className='singup' onSubmit={handelSubmit}>
          <div className="mb-3 ">
            <label className="form-label">Nom <span className="text-danger">*</span></label>
            <input type="text" className="form-control " name="lastname" onChange={handelLastnameChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Prénom <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="firstname" onChange={handelFirstnameChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email <span className="text-danger">*</span></label>
            <input type="email" className="form-control" name="email" onChange={handelEmailChange} />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe <span className="text-danger">*</span></label>
            <input type="password" className="form-control" name="password" onChange={handelPasswordChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Adress <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="adress" onChange={handelAdressChange} />
          </div>
          <div className="mb-3">

            <label className="form-label">Téléphone <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="phone" onChange={handelPhoneChange} />
          </div>
          <div className="mb-3">

            <label className="form-label">Status <span className="text-danger">*</span></label>
            <select name="status" className="form-select" onChange={handelStatusChange}>
              <option>Sélectionnez votre status</option>
              <option>Expéditeur</option>
              <option>Voyageur</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Photo</label>
            <input type="file" className="form-control" onChange={handelFileChange} />
          </div>
          <div className="p-3 text-center">
            <input className="  text-light valider px-5 py-2" type="submit" value="Valider" />
          </div>
          <h6 className="text-center text-secondary"> Ou inscrivez-vous en utilisant</h6>
          <hr/>
            <div className="reseSocio fs-2 text-center">
              <a href="https://www.google.com/intl/fr/gmail/about/"><i className="me-3 fa-brands fa-google"></i></a>
              <a href="https://www.facebook.com"><i className=" me-3 fa-brands fa-facebook"></i></a>
              <a href="https://www.icloud.com/mail"> <i className="fa-brands fa-apple text-dark"></i></a>
            </div>
            <p className="text-center py-5">Vous avez déjà un compte? <a className="text-secondary" href="/login">Connectez-vous</a></p>
        </form>
      </div>
      </div>
    </div>

  );
}

export default SignUp;
