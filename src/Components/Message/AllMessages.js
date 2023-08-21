import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

function AllMessages() {



    const initialestate = {
        loading: true,
        error: '',
        messages: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    messages: action.payload,
                    error: '',
                };
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    messages: [],
                    error: 'Something went wrong!!!!!',
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialestate);

    useEffect(() => {
        axios.get('http://localhost:5000/messages', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, [])
    return (
        <div>
            {state.loading ? 'loading...' : state.messages.map((message, index) => (
                <div style={{ backgroundColor: 'gray', color: 'white', padding: '10px',borderRadius: '5px' }} key={index}>
                    <img src='/img/enfant.jpg' className='rounded-circle' width={'50px'} />
                    <h2>{message.recipient}</h2>
                    <p>{message.message}</p>

                </div>
            ))}
        </div>
    )
}

export default AllMessages
