import { useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Fab from '@mui/material/Fab';
import moment from 'moment/moment';
import 'moment/locale/fr';
import Carousel from 'react-material-ui-carousel';
import { Button } from '@mui/material';
import apiClient, { getApiAssetUrl } from '../../../lib/api-client';
import type { Announcement } from '../../announcements/announcement.types';
import type { Member } from '../../members/member.types';

moment().locale('fr');

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
      <Carousel
        NavButton={({ onClick, className, style, next, prev }) => (
          <Button onClick={() => onClick()} className={className} style={style}>
            {next && 'Next'}
            {prev && 'Previous'}
          </Button>
        )}
      >
        {favoriteAnnouncements.length === 0 ? (
          <div>Loading...</div>
        ) : (
          favoriteAnnouncements.map((announcement, index) => (
            <div className="card-annonce" key={index}>
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
                <Fab
                  className="text-danger text-end"
                  size="small"
                  disabled
                  aria-label="like"
                >
                  <FavoriteIcon />
                </Fab>
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
                    {moment(announcement.departureDate).format('L')}
                  </b>
                  <br />
                  Arrivé ................
                  <b className="violet">
                    {' '}
                    {moment(announcement.arrivalDate).format('L')}
                  </b>
                </p>
              </div>
            </div>
          ))
        )}
      </Carousel>
    </div>
  );
}

export default FavoritesPage;
