import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import '../styles/accueil.css';
import moment from 'moment/moment';
import 'moment/locale/fr';

moment.locale('fr');

function AllComments() {
  const initialState = {
    loadingComments: true,
    errorComments: '',
    comments: [],
    loadingMembers: true,
    errorMembers: '',
    members: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_COMMENTS_SUCCESS':
        return {
          ...state,
          loadingComments: false,
          comments: action.payload,
          errorComments: '',
        };
      case 'FETCH_COMMENTS_ERROR':
        return {
          ...state,
          loadingComments: false,
          errorComments: 'Something went wrong with comments!',
        };
      case 'FETCH_MEMBERS_SUCCESS':
        return {
          ...state,
          loadingMembers: false,
          members: action.payload,
          errorMembers: '',
        };
      case 'FETCH_MEMBERS_ERROR':
        return {
          ...state,
          loadingMembers: false,
          errorMembers: 'Something went wrong with members!',
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios
      .get('http://localhost:5000/comments', { withCredentials: true })
      .then((response) => {
        dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_COMMENTS_ERROR' });
      });

    axios
      .get('http://localhost:5000/memberinfos', { withCredentials: true })
      .then((response) => {
        dispatch({ type: 'FETCH_MEMBERS_SUCCESS', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_MEMBERS_ERROR' });
      });
  }, []);

  return (
    <div className="avis">
      {state.loadingComments || state.loadingMembers ? (
        'Loading...'
      ) : (
        state.comments.map((comment, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              {state.members.map((member) => {
                if (member._id === comment.memberId) {
                  return (
                    <div key={member._id}>
                      <img
                        src={`http://localhost:5000/${member.imagename}`}
                        alt="Membre" className='rounded-circle'
                      />
                      <h3>{member.firstname}  {member.lastname}</h3>
                    </div>
                  );
                }
                return null;
              })}
              <Stack spacing={1}>
                <Rating
                  name="ratingStars"
                  value={comment.ratingStars}
                  size="medium"
                  readOnly
                />
              </Stack>
              <p className="card-text">{comment.content}</p>
              <p className="text-secondary card-text">
                {moment(comment.creationDate).format('LLL')}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllComments;
