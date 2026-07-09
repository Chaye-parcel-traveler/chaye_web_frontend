import VideoPresentation from '../../../components/VideoPresentation';
import ChoiceCarrierOrSender from '../../../components/ChoiceCarrierOrSender';
import Insurances from '../../../components/Insurances';
import HeadlineNews from '../../../components/HeadlineNews';
import UserOpinion from '../../../components/UserOpinion';
import WorldRegions from '../../../components/WorldRegions';
import Footer from '../../../components/Footer';

// The home screen mirrors the fonctionnality_bases section order. MainLayout
// provides the shared `.home` wrapper; the footer stays home-only like the
// reference so functional pages keep their own layout flow.
function HomePage() {
  return (
    <>
      <VideoPresentation />
      <ChoiceCarrierOrSender />
      <Insurances />
      <HeadlineNews />
      <UserOpinion />
      <WorldRegions />
      <Footer />
    </>
  );
}

export default HomePage;
