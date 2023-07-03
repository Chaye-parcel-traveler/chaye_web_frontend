import React, {useEffect, useReducer}from 'react'
import axios from 'axios'
import { Table } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'

function AllMembers() {

    const initialestate ={
        loading : true,
        error : '',
      membres : {}
    }
    
    const reducer = (state, action) => {
        switch (action.type) {
          case 'FETCH_SUCCESS':
            return {
              loading: false, 
             membres: action.payload, 
              error: '', 
            };
          case 'FETCH_ERROR':
            return {
              loading: false, 
             membres: {}, 
              error: 'Something went wrong!!!!!', 
            };
          default:
            return state;
        }
      };
      const [state, dispatch] =useReducer(reducer,initialestate)

      useEffect(()=>{
        axios.get('http://localhost:5000/members',{ withCredentials: true })
        .then(response=>{
            console.log(response.data);
                dispatch({type: 'FETCH_SUCCESS' , payload: response.data});
        
            }).catch(error=>{  
                 dispatch({type: 'FETCH_ERROR'});});
    }, [])
  
    
return(
  <div className="content">
   <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Nom</Table.HeaderCell>
        <Table.HeaderCell>Prenom</Table.HeaderCell>
        <Table.HeaderCell>E-mail</Table.HeaderCell>
        <Table.HeaderCell>Adresse</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Photos</Table.HeaderCell>
        <Table.HeaderCell>Modifier</Table.HeaderCell>
        <Table.HeaderCell>Supprimer</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    {state.loading ? 'Loading...'  : state.membres.map((member,index) => (
    <Table.Body >
      <Table.Row key={index}>
        <Table.Cell>{member.lastname}</Table.Cell>
        <Table.Cell>{member.firstname}</Table.Cell>
        <Table.Cell>{member.email}</Table.Cell>
        <Table.Cell>{member.adress}</Table.Cell>
        <Table.Cell>{member.status}</Table.Cell>
        <Table.Cell><img src={`http://localhost:5000/${member.imagename}`} width={'150px'}/></Table.Cell>
        <Table.Cell><Button primary   as='a' href={`/editMember/${member._id}`}>Modifier</Button></Table.Cell>
        <Table.Cell> 
         <form action={`http://localhost:5000/deleteMember/${member._id}?_method=DELETE`} method="post">
              <input type="hidden" name="_method" value="DELETE"/>
        <Button  positive>Supprimer</Button>
            </form>
       </Table.Cell>
      </Table.Row>
  
      </Table.Body>
  
   ) )}

  </Table>
  </div>
  )}
export default AllMembers