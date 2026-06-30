import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import { fetchMembers } from '../api/members.api';
import type { Member } from '../member.types';

type MembersState = {
  loading: boolean;
  error: string;
  members: Member[];
};

type MembersAction =
  { type: 'FETCH_SUCCESS'; payload: Member[] } | { type: 'FETCH_ERROR' };

function MembersPage() {
  const initialestate: MembersState = {
    loading: true,
    error: '',
    members: [],
  };

  const reducer = (
    state: MembersState,
    action: MembersAction
  ): MembersState => {
    switch (action.type) {
      case 'FETCH_SUCCESS':
        return {
          loading: false,
          members: action.payload,
          error: '',
        };
      case 'FETCH_ERROR':
        return {
          loading: false,
          members: [],
          error: 'Something went wrong!!!!!',
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialestate);

  useEffect(() => {
    async function fetchData() {
      try {
        const members = await fetchMembers();
        if (!members) {
          dispatch({ type: 'FETCH_ERROR' });
        } else {
          dispatch({ type: 'FETCH_SUCCESS', payload: members });
        }
      } catch {
        dispatch({ type: 'FETCH_ERROR' });
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>E-mail</th>
            <th>Adresse</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {state.loading ? (
            <tr>
              <td colSpan={6}>Chargement en cours...</td>
            </tr>
          ) : (
            state.members.map((member) => (
              <tr key={member._id}>
                <td>{member.firstname}</td>
                <td>{member.lastname}</td>
                <td>{member.email}</td>
                <td>{member.address}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/members/${member._id}/edit`}
                  >
                    Modifier
                  </Link>
                </td>
                <td>
                  <button className="btn btn-success" type="button">
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </React.Fragment>
  );
}
export default MembersPage;
