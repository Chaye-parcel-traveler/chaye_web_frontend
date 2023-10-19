import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react';
import Navbar from '../NavBar/NavBar';
import '../styles/formule.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function AddAnnouncements() {

  const navigate = useNavigate();
  const [userData, setUserData] = useState('');
  const [inputs, setInputs] = useState('');
  useEffect(() => {
    axios.get('/me')
      .then(response => {
        setUserData(response.data);
      }).catch(error => {
        setUserData(false);
      });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/announcements', inputs);
    navigate('/announcements')
  }

  return (
    <div className='content'>
      <div className="content-menu">
        <Navbar />
      </div>
      <div className="content-body">
        <Header />
        <Form className="bg-white my-3 formule" onSubmit={handleSubmit}>
          <input type="hidden" name='memberId' className="form-control " value={userData.id} />
          {/* <div className='formule-fond'>
            <h3 className="py-5" >Je transporte un colis</h3>
            <div className='city'>
              <input type="text" name='departureCity' className="form-control me-3" placeholder='Départ de ' required onChange={handleChange}/>
              <input type="text" name='destination' className="form-control " placeholder='Arrivé à ' required onChange={handleChange}/>
            </div>
          </div> */}
          <div className='formule-body mb-5'>

            <Form.Field>
              <label className="form-label">Type de l'annonce</label>
              <select name="type" className="form-select" required onChange={handleChange}>
                <option value="transport" >transport</option>
                <option value="shipping">shipping</option>
              </select>
            </Form.Field>

            {/* <Form.Field>
              <label className="form-label">Prix de kilo </label>
              <input type="number" name='priceKilo' min={0} className="form-control" required onChange={handleChange}/>
            </Form.Field> */}

            <Form.Field>
              <label className="form-label">Description:</label>
              <input type="text" name='description' className="form-control" required onChange={handleChange}/>
            </Form.Field>
            {/* <Form.Field>
              <label className="form-label">Date de départ</label>
              <input type="date" name="departureDate" className="form-control" required onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
              <label className="form-label">Date d'arrivée</label>
              <input type="date" name="arrivalDate" className="form-control" required onChange={handleChange}/>
            </Form.Field> */}
            <div className='button mb-5'>
              <Button id="btn" type="submit">Ajouter</Button>
            </div>
          </div>
        </Form>
        <Footer />
      </div>
    </div>
  );
}

export default AddAnnouncements;
