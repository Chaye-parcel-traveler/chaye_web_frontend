import { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import TinySlider from 'tiny-slider-react';
import 'tiny-slider/dist/tiny-slider.css';
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
  const settings = {
    // container: ".wide-slider-testimonial",
    items: 1,
    slideBy: 1,
    axis: 'horizontal',
    swipeAngle: false,
    speed: 700,
    nav: true,
    loop: true,
    edgePadding: 40,
    controls: true,
    controlsPosition: 'bottom',
    autoHeight: true,
    autoplay: true,
    mouseDrag: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3500,
    autoplayButtonOutput: false,
    controlsContainer: '#prevnext-testimonial',
    responsive: {
      350: {
        items: 1,
      },

      500: {
        items: 2,
      },
      600: {
        items: 3,
      },
      900: {
        items: 5,
      },
    },
  };

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
              <TinySlider
                className="wide-slider-testimonial"
                settings={settings}
              >
                {state.announcements.map((announcement, index) => (
                  <div key={index} className="item">
                    <blockquote className="block-testimonial">
                      <div className="author">
                        <img
                          src="images/img.png"
                          alt="Free template by TemplateUX"
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
                  </div>
                ))}
              </TinySlider>
            )}
          </div>

          <div className="text-center mb-5 " style={{ paddingTop: '76px' }}>
            <div id="prevnext-testimonial">
              <span className="prev me-3" data-controls="prev">
                <span className="icon-chevron-left"></span>
              </span>
              <span className="next" data-controls="next">
                <span className="icon-chevron-right"></span>
              </span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-4">
              <a className="btnChaye-purple" href="/announcements">
                Voir tous les annonces
              </a>
            </div>
            <div className="col-4">
              <Link className="btnChaye-orange" to="/carte">
                Carte intéractive
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementCarousel;
