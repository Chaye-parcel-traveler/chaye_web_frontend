import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function Inscription() {
  let navigate = useNavigate();
  const [file,setFile] = useState(null);
  const [nom,setNom] = useState('');
  const [prenom,setPrenom] = useState ('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [adresse,setAdresse] = useState('');
  const [telephone,setTelephone] = useState('');
  const [status,setStatus] = useState('');
  const [imagename,setImagename] = useState('');
 

  const handelFileChange = (event)=>{
    setFile(event.target.files[0]);
    setImagename(event.target.files[0].name); 
};
  const handelNomChange = (event)=>{
    setNom(event.target.value);
};
const handelPrenomChange = (event)=>{
  setPrenom(event.target.value);
};
const handelEmailChange = (event)=>{
  setEmail(event.target.value);
};
const handelPasswordChange = (event)=>{
  setPassword(event.target.value);
};
const handelAdresseChange = (event)=>{
  setAdresse(event.target.value);
};
const handelTelephoneChange = (event)=>{
  setTelephone(event.target.value);
};
const handelStatusChange = (event)=>{
  setStatus(event.target.value);
};
  const handelSubmit = (event)=>{
      event.preventDefault();
      if(file){
          const formData = new FormData();
          formData.append('file',file);//ajouter à l'interieur de formdata un element file
          formData.append('nom',nom);
          formData.append('prenom',prenom);
          formData.append('email',email);
          formData.append('password',password);
          formData.append('adresse',adresse);
          formData.append('telephone',telephone);
          formData.append('status',status);
          formData.append('imagename',imagename);
          axios.post(`http://localhost:5000/api/submitInscription`,formData)
          .then(( response )=>{
              console.log(response.data);
              return navigate("/allmembres");
          }).catch(( error )=>{
              console.log(error);
          });
  }}
  return (
    <React.Fragment>

      <div>  <h1>S'enregistrer</h1>
        <h3>Créez votre nouveau compte</h3>
      </div>

      <form  onSubmit={handelSubmit} >

        <label >Nom  </label>
        <input type="text"  name="nom" onChange={handelNomChange}/><br/><br/>


        <label >Prénom  </label>
        <input type="text"  name="prenom" onChange={handelPrenomChange} /><br/><br/>

        <label >Email   </label>
        <input type="email"  name="email" onChange={handelEmailChange} /><br/><br/>


        <label >Mot de passe   </label>

        <input type="password" name="password" onChange={handelPasswordChange} /><br/><br/>


        <label> Adresse  </label>
        <input type="text"  name="adresse" onChange={handelAdresseChange}/><br/><br/>


        <label>Téléphone  </label>
        <input type="text"  name="telephone" onChange={handelTelephoneChange}/> <br/><br/>

        <label>Status  </label>
        <select name="status" onChange={handelStatusChange}>
          <option>Sélectionnez votre status </option>
          <option>Expéditeur</option>
          <option >Voyageur</option>
         </select><br/><br/>
         <label>Photo </label>
         <input type="file" onChange={handelFileChange}/><br/><br/>
        <button type='submit'>Valider</button>
        
      </form>



    </React.Fragment>
  )
}

export default Inscription
