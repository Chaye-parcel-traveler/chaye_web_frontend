import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";
import Navbar from '../NavBar/NavBar';

import '../styles/formule.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AddPackage() {
  let navigate = useNavigate();
  const [announcementsType, setAnnouncementsType] = useState('');
  const [priceKilo, setPricekilo] = useState('');
  const [description, setDescription] = useState('');
  const [destination, setDestination] = useState('');
  const [departureCity, setDepartureCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };
  const handleAnnouncementsTypeChange = (event) => {
    setAnnouncementsType(event.target.value);
  };
  const handleDepartureDateChange = (event) => {
    setDepartureDate(event.target.value);
  };
  const handleArrivalDateChange = (event) => {
    setArrivalDate(event.target.value);
  };
  const handlePricekiloChange = (event) => {
    setPricekilo(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleDepartureCityChange = (event) => {
    setDepartureCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('announcementsType', announcementsType);
    formData.append('priceKilo', priceKilo);
    formData.append('description', description);
    formData.append('departureCity', departureCity);
    formData.append('destination', destination);
    formData.append('departureDate', departureDate);
    formData.append('arrivalDate', arrivalDate);
    axios
      .post(`http://localhost:5000/announcements`, formData)
      .then((response) => {
        console.log(response.data);
        return navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });

  };

  return (
    <div className='content'>
      <div className="content-menu">
        <Navbar />
      </div>
      <div className="content-body">
        <Header />
        <h1 className="text-center pt-5 fw-bold" >Je transporte un colis</h1>

        <Form className="bg-white my-3 formule" onSubmit={handleSubmit}>
          <div className=' d-flex my-5 '>
            <input type="text" name='departureCity' className="form-control me-5 py-3" onChange={handleDepartureCityChange} placeholder='Départ de ' />
            <input type="text" name='destination' className="form-control py-3" onChange={handleDestinationChange} placeholder='Arrivé à ' />
          </div>
          <Form.Field>
            <label className="form-label">Type de l'annonce</label>
            <input type="text" name='announcementsType' className="form-control" onChange={handleAnnouncementsTypeChange} />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Prix de kilo </label>
            <input type="number" name='priceKilo' className="form-control" onChange={handlePricekiloChange} />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Description:</label>
            <input type="text" name='description' className="form-control" onChange={handleDescriptionChange} />
          </Form.Field>
          <Form.Field>
            <label className="form-label">Date de départ</label>
            <input type="date" name="departureDate" className="form-control" onChange={handleDepartureDateChange} />
          </Form.Field>
          <Form.Field>
            <label className="form-label">Date d'arrivée</label>
            <input type="date" name="arrivalDate" className="form-control" onChange={handleArrivalDateChange} />
          </Form.Field>
          <div className='button mb-5'>
          <Button id="btn" type="submit">Ajouter</Button>
          </div>
        </Form>
        <Footer />
      </div>
    </div>
  );
}

export default AddPackage;
