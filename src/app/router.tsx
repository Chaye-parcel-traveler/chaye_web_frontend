import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes, useParams } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import AccountStatusNotice from '../components/AccountStatusNotice';
import Navigation from '../components/Navigation';

const AboutPage = lazy(() => import('../features/about/pages/AboutPage'));
const AnnouncementsPage = lazy(
  () => import('../features/announcements/pages/AnnouncementsPage')
);
const AdminModeration = lazy(() => import('../components/AdminModeration'));
const NewAnnouncementPage = lazy(
  () => import('../features/announcements/pages/NewAnnouncementPage')
);
const AuthPage = lazy(() => import('../features/auth/pages/AuthPage'));
const CarrierFormular = lazy(() => import('../components/CarrierFormular'));
const HomePage = lazy(() => import('../features/home/pages/HomePage'));
const LegalNoticePage = lazy(
  () => import('../features/legal/pages/LegalNoticePage')
);
const LegacyAnnounces = lazy(() => import('../components/Announces'));
const LegacyHome = lazy(() => import('../components/Home'));
const LegacyLogin = lazy(() => import('../components/Login'));
const LegacyRegister = lazy(() => import('../components/Register'));
const MessageThread = lazy(() => import('../components/MessageThread'));
const MessagesList = lazy(() => import('../components/MessagesList'));
const PrivacyPolicyPage = lazy(
  () => import('../features/legal/pages/PrivacyPolicyPage')
);
const ProfileAnnouncements = lazy(
  () => import('../components/ProfileAnnouncements')
);
const ProfileManager = lazy(() => import('../components/ProfileManager'));
const SenderFormular = lazy(
  () => import('../components/SendFormular/SenderFormular')
);
const EditMemberPage = lazy(
  () => import('../features/members/pages/EditMemberPage')
);
const MemberProfilePage = lazy(
  () => import('../features/members/pages/MemberProfilePage')
);
const MembersPage = lazy(() => import('../features/members/pages/MembersPage'));
const NotFoundPage = lazy(
  () => import('../features/navigation/pages/NotFoundPage')
);
const EditPackagePage = lazy(
  () => import('../features/packages/pages/EditPackagePage')
);
const NewPackagePage = lazy(
  () => import('../features/packages/pages/NewPackagePage')
);
const FaqPage = lazy(() => import('../features/support/pages/FaqPage'));
const SupportPage = lazy(() => import('../features/support/pages/SupportPage'));

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

function FunctionalLayout() {
  return (
    <>
      <Navigation />
      <AccountStatusNotice />
      <Outlet />
    </>
  );
}

function AppRouter() {
  return (
    <Suspense
      fallback={
        <div aria-live="polite" className="p-4 text-center">
          Chargement…
        </div>
      }
    >
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
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route element={<FunctionalLayout />}>
          <Route path="/fonctionnality-bases" element={<LegacyHome />} />
          <Route path="/login" element={<LegacyLogin />} />
          <Route path="/register" element={<LegacyRegister />} />
          <Route path="/carrier" element={<CarrierFormular />} />
          <Route path="/sender" element={<SenderFormular />} />
          <Route path="/annonces" element={<LegacyAnnounces />} />
          <Route path="/profil" element={<ProfileManager />} />
          <Route path="/profil/annonces" element={<ProfileAnnouncements />} />
          <Route path="/profil/messages" element={<MessagesList />} />
          <Route
            path="/profil/messages/:discussionId"
            element={<MessageThread />}
          />
          <Route path="/admin" element={<AdminModeration />} />
        </Route>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/loginSignup" element={<Navigate replace to="/auth" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
