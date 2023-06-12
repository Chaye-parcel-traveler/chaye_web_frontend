import React ,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
function EditeMembre() {
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
 useEffect(()=>{
  axios.get(`http://localhost:5000/editMembre/${params.id}`)
  .then(response =>{
      setLoading(false)
      setError('')
      setMembre(response.data)
      setFile(response.data.file)
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

return(
 <React.Fragment>

      <h1>Modifier votre Profile</h1>
      <form action={`http://localhost:5000/editMembre/${params.id}?_method=PUT`} method="post">
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
         <input type="file" Value={<img src={membre.file}/>} /><br/><br/>
        <button type='submit'>Valider</button>
        
      </form>



    </React.Fragment>
)

}
export default EditeMembre
