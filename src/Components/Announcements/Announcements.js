import Header from '../Header/Header';
import AllPackages from '../Package/AllPackages';
import Assurance from '../Header/Assurance';
import CarrouselAnnouncements from './CarrousselAnnouncements';

function Announcements() {
  return (
    <div className="content">
      <div className="content-body">
        <Header />
        <Assurance />
        <div className="content-main">
          <h2 className="titre">Toutes les annonces</h2>
          <CarrouselAnnouncements />
          <h2 className="titre">Les colis</h2>
          <AllPackages />
        </div>
      </div>
    </div>
  );
}

export default Announcements;
