import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

import moment from 'moment/moment';
import 'moment/locale/fr';
moment().locale('fr')
function AllComments() {
    const initialestate = {
        loading: true,
        error: '',
        comments: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    comments: action.payload,
                    error: '',
                };
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    comments: [],
                    error: 'Something went wrong!!!!!',
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialestate);

    useEffect(() => {
        axios.get('http://localhost:5000/comments', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, [])

    return (

        <div className='d-flex gap-3 m-5'>
            {state.loading ? 'loading...' : state.comments.map((comments, index) => (
                <div className="card" key={index}>
                    <div className='card-body '>
                        {/* <img src="../.." width="70px" height="70px" className="rounded-circle" alt="Cinque Terre" /> */}
                        <Stack spacing={1}>
                            <Rating name="ratingStars" defaultValue={comments.ratingStars} size="large" readOnly />
                        </Stack>
                        <p className="card-text">{comments.content}</p>
                        <p className="text-secondary card-text">{moment(comments.creationDate).format('LL')}</p>
                    </div>
                </div>
            ))}
        </div>

    );
}


export default AllComments
