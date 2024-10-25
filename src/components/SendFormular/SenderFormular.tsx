import { useLocation } from 'react-router-dom';
import ChoiceCarrierOrSender from '../ChoiceCarrierOrSender';
import DepartureArrival from './SendFormularElements/DepartureArrival';
import FormularSection from './SendFormularElements/FormularSection';

const SenderFormular = () => {
  const currentLocation = useLocation();

  const stripSpecialChars = (location: string) => {
    location = location.replace(/^\/+/, '');
    return location.replace(/[^a-zA-Z0-9 _.-]/g, '');
  };

  const chooseSentence = () => {
    const senderSentence = "J'expédie un colis";
    const carrierSentence = 'Je transporte un colis';

    const location = stripSpecialChars(currentLocation.pathname);
    return location == 'sender' ? senderSentence : carrierSentence;
  };

  return (
    <>
      <ChoiceCarrierOrSender />
      <div className="container">
        <div
          className="box-chaye margin-top-25 bgPurple"
          style={{ position: 'relative' }}
        >
          <h2 className="txtCenter margin-top-36 txtwhite margin-bottom-40 ">
            {chooseSentence()}
          </h2>
          <DepartureArrival />
        </div>
      </div>
      <FormularSection />
    </>
  );
};

export default SenderFormular;
