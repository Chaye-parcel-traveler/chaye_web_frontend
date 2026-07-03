import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const MainLayout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  if (isHomePage) {
    return (
      <div className="landing-layout">
        <Outlet />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <main className="home">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default MainLayout;
