import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

const AboutPage = lazy(() => import('../features/about/pages/AboutPage'));
const Announcements = lazy(() => import('../components/Announcements'));
const AdminModeration = lazy(() => import('../components/AdminModeration'));
const NewAnnouncementPage = lazy(
  () => import('../features/announcements/pages/NewAnnouncementPage')
);
const CarrierFormular = lazy(() => import('../components/CarrierFormular'));
const HomePage = lazy(() => import('../features/home/pages/HomePage'));
const LegalNoticePage = lazy(
  () => import('../features/legal/pages/LegalNoticePage')
);
const Login = lazy(() => import('../components/Login'));
const Register = lazy(() => import('../components/Register'));
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
          <Route path="/packages/new" element={<NewPackagePage />} />
          <Route path="/packages/:id/edit" element={<EditPackagePage />} />
          <Route path="/announcements" element={<Announcements />} />
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
          <Route
            path="/addPackage"
            element={<Navigate replace to="/packages/new" />}
          />
          <Route path="/editPackage/:id" element={<EditPackageRedirect />} />
          <Route
            path="/addAnnouncement"
            element={<Navigate replace to="/announcements/new" />}
          />
          <Route
            path="/annonces"
            element={<Navigate replace to="/announcements" />}
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
          <Route path="/fonctionnality-bases" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrier" element={<CarrierFormular />} />
          <Route path="/sender" element={<SenderFormular />} />
          <Route path="/profil" element={<ProfileManager />} />
          <Route path="/profil/annonces" element={<ProfileAnnouncements />} />
          <Route path="/profil/messages" element={<MessagesList />} />
          <Route
            path="/profil/messages/:discussionId"
            element={<MessageThread />}
          />
          <Route path="/admin" element={<AdminModeration />} />
          <Route
            path="/loginSignup"
            element={<Navigate replace to="/login" />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
