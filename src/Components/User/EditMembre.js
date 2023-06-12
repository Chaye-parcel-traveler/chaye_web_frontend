import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
function EditeMembre() {

  let navigate = useNavigate();
    const params = useParams();
 //chargement
 const[loading,setLoading] = useState(true)
 //Erreur
 const[error,setError] = useState('')
 //Données
 const[membre,setMembre] = useState({})
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



 useEffect(()=>{
  axios.get(`http://localhost:5000/editMembre/${params.id}`)
  .then(response =>{
      setLoading(false)
      setError('')
      setMembre(response.data)
      setNom(response.data.nom)
      setPrenom(response.data.prenom)
      setEmail(response.data.email)
      setPassword(response.data.password)
      setAdresse(response.data.adresse)
      setTelephone(response.data.telephone)
      setStatus(response.data.status)
      setImagename(response.data.image)
  }).catch(error =>{
      setLoading(false)
      setError('Something went wrong !!!!')
      setMembre({})
  })
},[])
const handelSubmit = (event)=>{
  event.preventDefault();
  console.log("test");
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
      
      axios.put(`http://localhost:5000/editMembre/${params.id}`,formData)
      .then(( response )=>{
          console.log(response.data);
          return navigate("/allmembres");
      }).catch(( error )=>{
          console.log(error);
      });
}}

return(
 <React.Fragment>

      <h1>Modifier votre Profile</h1>
      <form  onSubmit={handelSubmit}>
      <input type="hidden" name="_method" value="PUT"/>
        <label >Nom  </label>
        <input type="text"  name="nom"  Value={membre.nom}/><br/><br/>


        <label >Prénom  </label>
        <input type="text"  name="prenom"   Value={membre.prenom} /><br/><br/>

        <label >Email   </label>
        <input type="email"  name="email"   Value={membre.email} /><br/><br/>


        <label >Mot de passe   </label>

        <input type="password" name="password"   Value={membre.password} /><br/><br/>


        <label> Adresse  </label>
        <input type="text"  name="adresse"  Value={membre.adresse} /><br/><br/>


        <label>Téléphone  </label>
        <input type="text"  name="telephone"   Value={membre.telephone}/> <br/><br/>

        <label>Status  </label>
        <select name="status"  Value={membre.status} >
          <option>Sélectionnez votre status </option>
          <option>Expéditeur</option>
          <option >Voyageur</option>
         </select><br/><br/>
         <label>Photo </label>

         <input type="file" onChange={handelFileChange} /><br/><br/>
        <button type='submit'>Valider</button>
        
      </form>



    </React.Fragment>
)

}
export default EditeMembre
