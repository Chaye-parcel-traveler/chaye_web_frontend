import { useEffect, useReducer } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import apiClient from '../../../lib/api-client';
import type { Member } from '../../members/member.types';
import type { Announcement } from '../announcement.types';

type AnnouncementsState = {
  loadingAnnouncements: boolean;
  errorAnnouncements: string;
  announcements: Announcement[];
  loadingMembers: boolean;
  errorMembers: string;
  members: Member[];
};

type AnnouncementsAction =
  | { type: 'FETCH_ANNOUNCEMENTS_SUCCESS'; payload: Announcement[] }
  | { type: 'FETCH_ANNOUNCEMENTS_ERROR' }
  | { type: 'FETCH_MEMBERS_SUCCESS'; payload: Member[] }
  | { type: 'FETCH_MEMBERS_ERROR' };

function AnnouncementCarousel() {
  const initialState: AnnouncementsState = {
    loadingAnnouncements: true,
    errorAnnouncements: '',
    announcements: [],
    loadingMembers: true,
    errorMembers: '',
    members: [],
  };

  const reducer = (
    state: AnnouncementsState,
    action: AnnouncementsAction
  ): AnnouncementsState => {
    switch (action.type) {
      case 'FETCH_ANNOUNCEMENTS_SUCCESS':
        return {
          ...state,
          loadingAnnouncements: false,
          announcements: action.payload,
          errorAnnouncements: '',
        };
      case 'FETCH_ANNOUNCEMENTS_ERROR':
        return {
          ...state,
          loadingAnnouncements: false,
          errorAnnouncements: 'Something went wrong with announcements!',
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
    apiClient
      .get<Announcement[]>('/announcements')
      .then((response) => {
        dispatch({
          type: 'FETCH_ANNOUNCEMENTS_SUCCESS',
          payload: response.data,
        });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_ANNOUNCEMENTS_ERROR' });
      });
  }, []);

  return (
    <div className="container">
      <h2 className="txtLeft margin-top-36">A la une</h2>
      <div className="box-chaye sansFond margin-top-25 ">
        <div className="section">
          <div className="wide-slider-testimonial-wrap">
            {state.loadingAnnouncements ? (
              `Loading...`
            ) : !state.loadingAnnouncements &&
              state.announcements.length === 0 ? (
              `Pas d'annonces`
            ) : (
              <Carousel
                className="wide-slider-testimonial"
                indicators={false}
                interval={3500}
                nextLabel="Annonce suivante"
                prevLabel="Annonce précédente"
              >
                {state.announcements.map((announcement) => (
                  <Carousel.Item
                    key={announcement.id}
                    className="item"
                    data-testid="announcement-card"
                  >
                    <blockquote className="block-testimonial">
                      <div className="author">
                        <img
                          src="images/img.png"
                          alt={`Annonce à destination de ${
                            announcement.arrivingAt ??
                            announcement.arriving_at ??
                            'destination non précisée'
                          }`}
                        />
                        <div className="txt-alaune">
                          <div>
                            <span>Destination</span>..............
                            <span className="txtViolet">
                              {announcement.arrivingAt ||
                                announcement.arriving_at}
                            </span>
                          </div>
                          <div>
                            <span>Poids disponible</span>........
                            <span className="txtViolet">
                              {announcement.weightAvailability ||
                                announcement.weight_availability}
                              kg
                            </span>
                          </div>
                          <div>
                            <span>Prix au kilo</span>........................
                            <span className="txtViolet">
                              {announcement.price}€
                            </span>
                          </div>
                        </div>
                      </div>
                    </blockquote>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4">
              <Link className="btnChaye-purple" to="/announcements">
                Voir tous les annonces
              </Link>
            </div>
            <div className="col-4">
              <span className="btnChaye-orange" aria-disabled="true">
                Carte interactive (bientôt)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementCarousel;
