import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import Navbar from '../NavBar/NavBar';
import '../styles/accueil.css';

import '../styles/formule.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AddPackage() {
  let navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [weight, setWeight] = useState('');
  const [size, setSize] = useState('');
  const [picture, setPicture] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [userData, setUserData] = useState('');
  useEffect(() => {
    axios.get('/me')
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        setUserData(false);
      });
  }, []);
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
  const handleArrivalCityChange = (event) => {
    setArrivalCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('content', content);
      formData.append('weight', weight);
      formData.append('size', size);
      formData.append('departureCity', departureCity);
      formData.append('arrivalCity', arrivalCity);
      formData.append('picture', picture);
      axios
        .post(`/packages`, formData ,{withCredentials:true})
        .then((response) => {
          console.log(response.data);
          return navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className='content'>
      <div className='content-menu'>
        <Navbar />
      </div>
      <div className="content-body ">
        <Header />
        <Form className="formule" onSubmit={handleSubmit}>
          <input type="hidden" name='memberId' className="form-control " value={userData.id} />
          <div className='formule-fond'>
            <h3 className='py-5'>J'expédier un colis</h3>
            <div className='city'>
              <input type="text" name='departureCity' className="form-control me-3" onChange={handleDepartureCityChange} placeholder='Départ de ' />
              <input type="text" name='arrivalCity' className="form-control" onChange={handleArrivalCityChange} placeholder='Arrivé à ' />
            </div>
          </div>
          <div className='formule-body mb-5'>
            <Form.Field>
              <label className="form-label">Contenu:</label>
              <input type="text" name='content' className="form-control" onChange={handleContentChange} />
            </Form.Field>
            <Form.Field>
              <label className="form-label">Poids:</label>
              <input type="number" name='weight' className="form-control" min={0} onChange={handleWeightChange} />
            </Form.Field>
            <Form.Field>
              <label className="form-label">Taille:</label>
              <input type="number" name='size' className="form-control" min={0} onChange={handleSizeChange} />
            </Form.Field>
            <Form.Field>
              <label className="form-label">Photo de contenu du colis :</label>
              <input type="file" name='picture' className="form-control" onChange={handleFileChange} />
            </Form.Field>
            <div className='button mb-5'>
              <Button id="btn" primary type="submit">Ajouter</Button>
            </div>
          </div>
        </Form>
        <Footer />
      </div>
    </div>
  );
}

export default AddPackage;