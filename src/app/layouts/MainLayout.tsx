import { Outlet } from 'react-router-dom';
import AccountStatusNotice from '../../components/AccountStatusNotice';
import Navbar from '../../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <section className="home">
        <AccountStatusNotice />
        <Outlet />
      </section>
    </div>
  );
};

export default MainLayout;
