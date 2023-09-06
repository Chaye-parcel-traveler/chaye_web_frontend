import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import Navbar from '../NavBar/NavBar';
import '../styles/formule.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AddAnnouncements() {


  const [userData, setUserData] = useState('');
  useEffect(() => {
      axios.get('http://localhost:5000/getConnectedUser', { withCredentials: true })
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        setUserData(false);
      });
  }, []);
  return (
    <div className='content'>
      <div className="content-menu">
        <Navbar />
      </div>
      <div className="content-body">
        <Header />
        <h1 className="text-center pt-5 fw-bold" >Je transporte un colis</h1>

        <Form className="bg-white my-3 formule" action="http://localhost:5000/announcement" method="post">
        <input type="hidden" name='memberId' className="form-control " value={userData.id} />

          <div className=' d-flex my-5 '>
            <input type="text" name='departureCity' className="form-control me-5 py-3"  placeholder='Départ de ' required />
            <input type="text" name='destination' className="form-control py-3" placeholder='Arrivé à ' required />
          </div>
          <Form.Field>
            <label className="form-label">Type de l'annonce</label>
            <select name="announcementsType" className="form-select" required>
              <option>Disponible</option>
              <option>Non disponible</option>
            </select>
          </Form.Field>

          <Form.Field>
            <label className="form-label">Prix de kilo </label>
            <input type="number" name='priceKilo' className="form-control" required />
          </Form.Field>

          <Form.Field>
            <label className="form-label">Description:</label>
            <input type="text" name='description' className="form-control" required />
          </Form.Field>
          <Form.Field>
            <label className="form-label">Date de départ</label>
            <input type="date" name="departureDate" className="form-control"  required />
          </Form.Field>
          <Form.Field>
            <label className="form-label">Date d'arrivée</label>
            <input type="date" name="arrivalDate" className="form-control"  required />
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

export default AddAnnouncements;
