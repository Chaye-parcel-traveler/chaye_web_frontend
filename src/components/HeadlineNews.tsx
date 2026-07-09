import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import apiClient from '../lib/api-client';
import type { Announcement } from '../features/announcements/announcement.types';
import ReportButton from './ReportButton';

const dash = '—';

const HeadlineNews = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    apiClient
      .get<Announcement[]>('/announcements')
      .then((response) => {
        if (!active) {
          return;
        }
        setAnnouncements(Array.isArray(response.data) ? response.data : []);
        setError(false);
      })
      .catch(() => {
        if (active) {
          setError(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const hasAnnouncements = !loading && !error && announcements.length > 0;

  return (
    <DivContainer className="container">
      <h2 className="txtLeft margin-top-36">A la une</h2>
      <div className="box-chaye sansFond margin-top-25 ">
        <div className="section">
          <div className="wide-slider-testimonial-wrap">
            {loading && <Feedback>Chargement…</Feedback>}
            {!loading && (error || announcements.length === 0) && (
              <Feedback>Pas d'annonces pour le moment.</Feedback>
            )}
            {hasAnnouncements && (
              <WST className="wide-slider-testimonial">
                {announcements.map((announcement, index) => {
                  const key = announcement.id ?? announcement._id ?? index;
                  const destination =
                    announcement.arrivingAt ??
                    announcement.arriving_at ??
                    announcement.destination ??
                    dash;
                  const weight =
                    announcement.weightAvailability ??
                    announcement.weight_availability ??
                    dash;
                  const price = announcement.price ?? dash;

                  return (
                    <Item className="item" key={key}>
                      <blockquote className="block-testimonial">
                        <div className="author">
                          <img
                            src="images/img.png"
                            alt={`Annonce à destination de ${destination}`}
                          />
                          <div className="txt-alaune">
                            <div>
                              <span> Destination</span>..............
                              <span className="txtViolet">{destination}</span>
                            </div>
                            <div>
                              {' '}
                              <span> Poids disponible</span>........
                              <span className="txtViolet">
                                {weight}
                                {weight === dash ? '' : 'kg'}
                              </span>
                            </div>
                            <div>
                              {' '}
                              <span> Prix</span>
                              ........................................
                              <span className="txtViolet">
                                {price}
                                {price === dash ? '' : '€'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ReportAction>
                          <ReportButton
                            targetType="announcement"
                            targetId={key}
                            targetLabel="cette annonce"
                          />
                        </ReportAction>
                      </blockquote>
                    </Item>
                  );
                })}
              </WST>
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
              <Link className="btnChaye-purple" to="/announcements">
                Voir tous les annonces
              </Link>
            </div>
            <div className="col-4">
              <button className="btnChaye-orange" type="button">
                Carte intéractive
              </button>
            </div>
          </div>
        </div>
      </div>
    </DivContainer>
  );
};

const DivContainer = styled.div`
  overflow-x: hidden;
`;

const WST = styled.div`
  scroll-snap-type: mandatory;
  scroll-padding: 0 24px;
  overflow-x: scroll;
  animation: scroll 30s linear infinite;

  /* Hide scrollbar for WebKit browsers */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for other browsers */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const Item = styled.div`
  scroll-snap-align: start;
`;

const ReportAction = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 14px;
`;

const Feedback = styled.p`
  margin: 0;
  padding: 24px;
  text-align: center;
`;

export default HeadlineNews;
