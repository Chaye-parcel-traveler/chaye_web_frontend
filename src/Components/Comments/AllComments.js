import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import moment from 'moment/moment';
import 'moment/locale/fr';
moment().locale('fr')
function AllComments() {

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
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

        <div className='caroussel'>
        {state.loading ? 'loading...' : state.comments.map((comments, index) => (
        <Slider {...settings}>
                    <div className="card" key={index}>
                        {/* <img src="../.." width="70px" height="70px" className="rounded-circle" alt="Cinque Terre" /> */}
                        <Stack spacing={1}>
                            <Rating name="ratingStars" defaultValue={comments.ratingStars} size="large" readOnly />
                        </Stack>
                        <p className="card-text">{comments.content}</p>
                        <p className="text-secondary card-text">{moment(comments.creationDate).format('LL')}</p>

                    </div>
        </Slider>
                ))}
            </div>

    );
}


export default AllComments
