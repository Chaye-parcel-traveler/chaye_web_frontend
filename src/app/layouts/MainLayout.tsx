import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <section className="home">
        <Outlet />
        <Footer />
      </section>
    </div>
  );
};

export default MainLayout;
