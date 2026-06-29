import Header from '../../../components/Header';
import InsurancePanel from '../../insurance/components/InsurancePanel';
import PackageList from '../../packages/components/PackageList';
import AnnouncementCarousel from '../components/AnnouncementCarousel';

function AnnouncementsPage() {
  return (
    <div className="content">
      <div className="content-body">
        <Header />
        <InsurancePanel />
        <div className="content-main">
          <h2 className="titre">Toutes les annonces</h2>
          <AnnouncementCarousel />
          <h2 className="titre">Les colis</h2>
          <PackageList />
        </div>
      </div>
    </div>
  );
}

export default AnnouncementsPage;
