import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import AboutPage from '../features/about/pages/AboutPage';
import AnnouncementsPage from '../features/announcements/pages/AnnouncementsPage';
import NewAnnouncementPage from '../features/announcements/pages/NewAnnouncementPage';
import AuthPage from '../features/auth/pages/AuthPage';
import HomePage from '../features/home/pages/HomePage';
import LegalNoticePage from '../features/legal/pages/LegalNoticePage';
import PrivacyPolicyPage from '../features/legal/pages/PrivacyPolicyPage';
import EditMemberPage from '../features/members/pages/EditMemberPage';
import MemberProfilePage from '../features/members/pages/MemberProfilePage';
import MembersPage from '../features/members/pages/MembersPage';
import EditPackagePage from '../features/packages/pages/EditPackagePage';
import NewPackagePage from '../features/packages/pages/NewPackagePage';
import FaqPage from '../features/support/pages/FaqPage';
import SupportPage from '../features/support/pages/SupportPage';
import MainLayout from './layouts/MainLayout';

function MemberProfileRedirect() {
  const { id } = useParams();
  return <Navigate replace to={`/members/${id}`} />;
}

function EditMemberRedirect() {
  const { id } = useParams();
  return <Navigate replace to={`/members/${id}/edit`} />;
}

function EditPackageRedirect() {
  const { id } = useParams();
  return <Navigate replace to={`/packages/${id}/edit`} />;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/members" element={<MembersPage />} />
        <Route path="/members/:id/edit" element={<EditMemberPage />} />
        <Route path="/members/:id" element={<MemberProfilePage />} />
        <Route path="/packages/new" element={<NewPackagePage />} />
        <Route path="/packages/:id/edit" element={<EditPackagePage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/announcements/new" element={<NewAnnouncementPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/legal-notice" element={<LegalNoticePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        <Route
          path="/allmembers"
          element={<Navigate replace to="/members" />}
        />
        <Route path="/editmember/:id" element={<EditMemberRedirect />} />
        <Route path="/profile/:id" element={<MemberProfileRedirect />} />
        <Route
          path="/addPackage"
          element={<Navigate replace to="/packages/new" />}
        />
        <Route path="/editPackage/:id" element={<EditPackageRedirect />} />
        <Route
          path="/addAnnouncement"
          element={<Navigate replace to="/announcements/new" />}
        />
        <Route path="/aboutUs" element={<Navigate replace to="/about" />} />
        <Route
          path="/mentionlegale"
          element={<Navigate replace to="/legal-notice" />}
        />
        <Route
          path="/politiqueDeConfidentialite"
          element={<Navigate replace to="/privacy-policy" />}
        />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/loginSignup" element={<Navigate replace to="/auth" />} />
    </Routes>
  );
}

export default AppRouter;
