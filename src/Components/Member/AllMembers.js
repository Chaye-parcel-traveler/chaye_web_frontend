import React, { useEffect, useReducer } from 'react'
import { Table, Button } from 'semantic-ui-react'
import { fetchMembers } from '../../Services/member'

function AllMembers() {

  const initialestate = {
    loading: true,
    error: '',
    membres: {}
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        console.log('reducer FETCH_SUCCESS',state, action)
        return {
          loading: false,
          membres: action.payload,
          error: '',
        };
      case 'FETCH_ERROR':
        console.log('reducer FETCH_ERROR',state, action)
        return {
          loading: false,
          membres: [],
          error: 'Something went wrong!!!!!',
        };
      default:
        console.log('reducer default',state, action)
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialestate)

  useEffect(() => {
    async function fetchData() {
      try {
        const members = await fetchMembers()
        if (!members) {
          dispatch({ type: 'FETCH_ERROR' });
        } else {
          dispatch({ type: 'FETCH_SUCCESS', payload: members });
        }
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
      }
    }
    fetchData();
  }, [])


  return (
    <Table striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Nom</Table.HeaderCell>
          <Table.HeaderCell>Prenom</Table.HeaderCell>
          <Table.HeaderCell>E-mail</Table.HeaderCell>
          <Table.HeaderCell>Adresse</Table.HeaderCell>
          {/* <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Photos</Table.HeaderCell> */}
          <Table.HeaderCell>Modifier</Table.HeaderCell>
          <Table.HeaderCell>Supprimer</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {state.loading ? 'Loading...' : state.membres.map((membre, index) => (
        <Table.Body >
          <Table.Row key={index}>
            <Table.Cell>{membre.firstname}</Table.Cell>
            <Table.Cell>{membre.lastname}</Table.Cell>
            <Table.Cell>{membre.email}</Table.Cell>
            <Table.Cell>{membre.address}</Table.Cell>
            {/* <Table.Cell>{membre.status}</Table.Cell> */}
            {/* <Table.Cell><img src={`http://localhost:5000/${membre.imagename}`} width={'150px'} /></Table.Cell> */}
            <Table.Cell><Button primary as='a' href={`/editMembre/${membre._id}`}>Edit</Button></Table.Cell>
            <Table.Cell>
              <form action={`http://localhost:5000/membre/delete/${membre._id}?_method=DELETE`} method="post">
                <input type="hidden" name="_method" value="DELETE" />
                <Button positive>Supprimer</Button>
              </form>
            </Table.Cell>
          </Table.Row>

        </Table.Body>

      ))}

    </Table>
  )
}
export default AllMembers
