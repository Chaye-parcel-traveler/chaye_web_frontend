
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Card, Button } from 'semantic-ui-react';
//Moment (date)
import moment from 'moment/moment' ;
import 'moment/locale/fr'
moment().locale('fr')

function Accueil() {
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
        axios.get('http://localhost:5000/colis',{withCredentials:true})
        .then(response=>{
            console.log(response.data);
                dispatch({type: 'FETCH_SUCCESS' , payload: response.data});
        
            }).catch(error=>{  
                 dispatch({type: 'FETCH_ERROR'});});
    }, [])
try{
  <div>
  <h1>Bienvenue sur la page d'accueil</h1>
  <h2>Liste des colis</h2>
  </div>
  var returnContact =state.colis.map((colis,index) => (
    <div>
      <Card.Group>
          <Card key={index}>
          <img src={`http://localhost:5000/${colis.photo}`}/>
            <Card.Content>
              <Card.Header>{colis.contenu}</Card.Header>
              <Card.Meta>{colis.villeDepart}</Card.Meta>
              <Card.Description>
                Dimensions: {colis.largeur}cm x {colis.longueur}cm x {colis.profondeur}cm
              </Card.Description>
              <Card.Description>Date limite d'Expédition : {moment(colis.dateLimiteExpedition).format('L')}</Card.Description>
              <Button primary   as='a' href={`/editcolis/${colis._id}`}>Edit</Button>
              <form action={`http://localhost:5000/colis/delete/${colis._id}?_method=DELETE`} method="post">
              <input type="hidden" name="_method" value="DELETE"/>

                <Button  positive>Supprimer</Button>
            </form>
            </Card.Content>
          </Card>
      </Card.Group>
    </div>
  ));
}
catch(error){
  console.log(error)
  console.log("utilisateur non connecter")
}
return (
  <React.Fragment>
    
      <h1>Bienvenu sur notre site Chaye</h1>
      {returnContact}
      
  </React.Fragment>
)


}




export default Accueil
