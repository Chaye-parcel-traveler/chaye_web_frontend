import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import '../styles/accueil.css';
import '../styles/nav.css';

//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr'
moment().locale('fr')

function AllPackages() {
    const initialestate = {
        loading: true,
        error: '',
        packages: []
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    packages: action.payload,
                    error: '',
                };
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    packages: [],
                    error: 'Something went wrong!!!!!',
                };
            default:
                return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialestate);

    useEffect(() => {
        axios.get('http://localhost:5000/packages', { withCredentials: true })
            .then(response => {
                console.log(response.data);
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });

            }).catch(error => {
                dispatch({ type: 'FETCH_ERROR' });
            });
    }, [])
    return (
        <React.Fragment>

            <div className='annonce'>
                {state.loading ? 'loading...' : state.packages.map((packages, index) => (
                    <div className="card " key={index}>
                        <div className='card-top '>
                            <img src={`http://localhost:5000/${packages.picture}`} alt="" />
                        </div>
                        <div className="card-body">
                            <p className="card-text ">
                                Départ :<b className="text-primary">{packages.departureCity}</b> <br />
                                Contenu : <b className="text-primary">{packages.content}</b><br />
                                Dimensions: <b className="text-primary">{packages.weight}x{packages.size}</b><br />
                                Date de Création :<b className="text-primary"> {moment(packages.creationDate).format('L')}</b><br />
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>

    )

}

export default AllPackages