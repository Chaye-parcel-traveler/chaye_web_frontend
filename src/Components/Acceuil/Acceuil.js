
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react';

function Acceuil() {
    const initialestate ={
        loading : true,
        error : '',
      colis : {}
    }
    
    const reducer = (state, action) => {
        switch (action.type) {
          case 'FETCH_SUCCESS':
            return {
              loading: false, 
             colis: action.payload, 
              error: '', 
            };
          case 'FETCH_ERROR':
            return {
              loading: false, 
             colis: {}, 
              error: 'Something went wrong!!!!!', 
            };
          default:
            return state;
        }
      };
      const [state, dispatch] =useReducer(reducer,initialestate)

      useEffect(()=>{
        axios.get('http://localhost:5000/colis')
        .then(response=>{
            console.log(response.data);
                dispatch({type: 'FETCH_SUCCESS' , payload: response.data});
        
            }).catch(error=>{  
                 dispatch({type: 'FETCH_ERROR'});});
    }, [])

  return (
    <div>
    <h1>Bienvenue sur la page d'Acceuil</h1>
      <h2>Liste des colis</h2>
      <Card.Group>
      {state.loading ? 'Loading...'  : state.colis.map((colis,index) => (
          <Card key={index}>
          <img src={`http://localhost:5000/${colis.photo}`}/>
            <Card.Content>
              <Card.Header>{colis.contenu}</Card.Header>
              <Card.Meta>{colis.villeDepart}</Card.Meta>
              <Card.Description>
                Dimensions: {colis.largeur}cm x {colis.longueur}cm x {colis.profondeur}cm
              </Card.Description>
              <Card.Description>Date limite: {colis.dateLimiteExpedition}</Card.Description>
              <form action={`http://localhost:5000/colis/delete/${colis._id}?_method=DELETE`} method="post">
              <input type="hidden" name="_method" value="DELETE"/>

                <Button  positive>Supprimer</Button>
            </form>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
}




export default Acceuil

