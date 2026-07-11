import { Outlet } from 'react-router-dom';
import AccountStatusNotice from '../../features/members/components/AccountStatusNotice';
import Navigation from '../../components/Navigation';

function MainLayout() {
  return (
    <>
      <Navigation />
      <AccountStatusNotice />
      <Outlet />
    </>
  );
}

export default MainLayout;
