import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/signup.css';
import { useNavigate } from 'react-router-dom';

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
      .get(`http://localhost:5000/members/${params.id}`)
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
        .put(`http://localhost:5000/members/${params.id}`, formData)
        .then((response) => {
          console.log(response.data);
          return navigate('/allmembers');
        })
        .catch((error) => {
          console.log(error);
        });
  };

  return (
    <div className=" Bg vh-100">
    <div className=" d-flex justify-content-center">
      <a href="/"><img src={"img/logo.png"} alt="Logo" className="Logo" /></a>
    </div>
    <div className="formule bg-white container-fluid col-4 my-3 ">
      <div className="m-5 ">
        <div className='text-center mt-5'>
          <h1 className="text-center pt-5 fs-2 fw-bold">Modifier votre Profile</h1>
        </div>
        <form className='singup' onSubmit={handelSubmit}>
        <input type="hidden" name="_method" value="PUT" />
          <div className="mb-3 ">
            <label className="form-label">Nom</label>
            <input type="text" className="form-control " name="lastname" onChange={handelLastnameChange} value={lastname} />
          </div>
          <div className="mb-3">
            <label className="form-label">Prénom </label>
            <input type="text" className="form-control" name="firstname" onChange={handelFirstnameChange} value={firstname} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email </label>
            <input type="email" className="form-control" name="email" onChange={handelEmailChange} value={email}  />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe </label>
            <input type="password" className="form-control" name="password" onChange={handelPasswordChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Adress </label>
            <input type="text" className="form-control" name="adress" onChange={handelAdressChange} value={adress} />
          </div>
          <div className="mb-3">
            <label className="form-label">Téléphone </label>
            <input type="text" className="form-control" name="phone" onChange={handelPhoneChange} value={phone} />
          </div>
          <div className="mb-3">
            <label className="form-label">Status </label>
            <select name="status" className="form-select" onChange={handelStatusChange} value={status}>
              <option>Sélectionnez votre status</option>
              <option>Expéditeur</option>
              <option>Voyageur</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Photo</label>
            <input type="file" className="form-control" onChange={handelFileChange} />
            <img src={`http://localhost:5000/${imagename}`} width="150px" alt="Profil" />
          </div>
          <div className="p-3 text-center">
            <input className="text-light fw-bold valider px-5 py-2" type="submit" value="Modifier" />

          </div>
        </form>
      </div>
    </div>
  </div>

  );
}

export default EditMember;
