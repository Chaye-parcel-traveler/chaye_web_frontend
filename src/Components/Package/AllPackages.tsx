import React, { useEffect, useReducer } from 'react';
import apiClient, { getApiAssetUrl } from '../../lib/api';
//Moment (date)
import moment from 'moment/moment';
import 'moment/locale/fr';
import type { Package } from '../../types/entities';

moment().locale('fr');

type PackagesState = {
  loading: boolean;
  error: string;
  packages: Package[];
};

type PackagesAction =
  { type: 'FETCH_SUCCESS'; payload: Package[] } | { type: 'FETCH_ERROR' };

function AllPackages() {
  const initialestate: PackagesState = {
    loading: true,
    error: '',
    packages: [],
  };

  const reducer = (
    state: PackagesState,
    action: PackagesAction
  ): PackagesState => {
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
    apiClient
      .get<Package[]>('/packages', { withCredentials: true })
      .then((response) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_ERROR' });
      });
  }, []);
  return (
    <React.Fragment>
      <div className="annonce">
        {state.loading
          ? 'loading...'
          : state.packages.map((packages, index) => (
              <div className="card " key={index}>
                <div className="card-top ">
                  <img src={getApiAssetUrl(packages.picture)} alt="" />
                </div>
                <div className="card-body">
                  <p className="card-text ">
                    Départ ...........
                    <b className="violet">{packages.departureCity}</b> <br />
                    Contenu ..........{' '}
                    <b className="violet">{packages.content}</b>
                    <br />
                    Dimensions.........{' '}
                    <b className="violet">
                      {packages.weight} kg x{packages.size} cm
                    </b>
                    <br />
                  </p>
                  <span className="text-secondary text-center">
                    {' '}
                    {moment(packages.creationDate).format('LLL')}
                  </span>
                  <br />
                </div>
              </div>
            ))}
      </div>
    </React.Fragment>
  );
}

export default AllPackages;
