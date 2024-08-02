import Footer from './Footer';
import WorldRegions from './WorldRegions';
import UserOpinion from './UserOpinion';
import HeadlineNews from './HeadlineNews';
import Insurances from './Insurances';
import ChoiceCarrierOrSender from './ChoiceCarrierOrSender';
import VideoPresentation from './VideoPresentation';

const Home = () => {
  return (
    <section className="home">
      <VideoPresentation />
      <ChoiceCarrierOrSender />
      <Insurances />
      <HeadlineNews />
      <UserOpinion />
      <WorldRegions />
      <Footer />
    </section>
  );
};

export default Home;
