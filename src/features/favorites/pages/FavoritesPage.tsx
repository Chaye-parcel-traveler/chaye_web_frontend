import { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import apiClient, { getApiAssetUrl } from '../../../lib/api-client';
import { formatFrenchDate } from '../../../lib/date-format';
import type { Announcement } from '../../announcements/announcement.types';
import type { Member } from '../../members/member.types';

function FavoritesPage() {
  const [favoriteAnnouncements, setFavoriteAnnouncements] = useState<
    Announcement[]
  >([]);
  const [members, setMembers] = useState<Member[]>([]);
  useEffect(() => {
    apiClient
      .get<Announcement[]>('/favorites', { withCredentials: true })
      .then((response) => {
        setFavoriteAnnouncements(response.data);
      })
      .catch(() => {});

    // Récupérez les informations sur les membres ici
    apiClient
      .get<Member[]>('/memberinfos', { withCredentials: true })
      .then((response) => {
        setMembers(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="carousel-container">
      <Carousel>
        {favoriteAnnouncements.length === 0 ? (
          <div>Loading...</div>
        ) : (
          favoriteAnnouncements.map((announcement) => (
            <Carousel.Item key={announcement.id}>
              <div className="card-annonce">
                <div className="card-top">
                  {members.map((member) => {
                    if (member._id === announcement.memberId) {
                      return (
                        <div key={member._id}>
                          <img
                            src={getApiAssetUrl(member.imagename)}
                            alt="Membre"
                          />
                        </div>
                      );
                    }
                    return null;
                  })}
                  <span className="text-danger text-end" aria-label="Favori">
                    ♥
                  </span>
                  <br />
                </div>
                <div className="card-body">
                  <p className="card-text ">
                    Destination ................
                    <b className="violet">{announcement.destination}</b> <br />
                    Prix ...............
                    <b className="violet">{announcement.priceKilo}€</b>
                    <br />
                    Départ ...............
                    <b className="violet">
                      {' '}
                      {formatFrenchDate(announcement.departureDate)}
                    </b>
                    <br />
                    Arrivé ................
                    <b className="violet">
                      {' '}
                      {formatFrenchDate(announcement.arrivalDate)}
                    </b>
                  </p>
                </div>
              </div>
            </Carousel.Item>
          ))
        )}
      </Carousel>
    </div>
  );
}

export default FavoritesPage;
