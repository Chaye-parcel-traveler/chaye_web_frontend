import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

const AdminModeration = lazy(
  () => import('../features/moderation/pages/AdminModerationPage'),
);
const About = lazy(() => import('../features/about/pages/AboutPage'));
const Announces = lazy(
  () => import('../features/announcements/pages/AnnouncementsPage'),
);
const CarrierFormular = lazy(
  () => import('../features/announcements/pages/NewTransportAnnouncementPage'),
);
const Home = lazy(() => import('../features/home/pages/HomePage'));
const Login = lazy(() => import('../features/auth/pages/LoginPage'));
const LegalNotice = lazy(
  () => import('../features/legal/pages/LegalNoticePage'),
);
const MessageThread = lazy(
  () => import('../features/messages/pages/MessageThreadPage'),
);
const MessagesList = lazy(
  () => import('../features/messages/pages/MessagesListPage'),
);
const NotFound = lazy(
  () => import('../features/navigation/pages/NotFoundPage'),
);
const ProfileAnnouncements = lazy(
  () => import('../features/profile/pages/ProfileAnnouncementsPage'),
);
const ProfileManager = lazy(
  () => import('../features/profile/pages/ProfilePage'),
);
const PrivacyPolicy = lazy(
  () => import('../features/legal/pages/PrivacyPolicyPage'),
);
const Register = lazy(() => import('../features/auth/pages/RegisterPage'));
const SenderFormular = lazy(
  () => import('../features/announcements/pages/NewShippingAnnouncementPage'),
);
const Support = lazy(() => import('../features/support/pages/SupportPage'));

function AppRouter() {
  return (
    <Suspense fallback={<main className="container">Chargement...</main>}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/carrier" element={<CarrierFormular />} />
          <Route path="/sender" element={<SenderFormular />} />
          <Route path="/annonces" element={<Announces />} />
          <Route path="/about" element={<About />} />
          <Route path="/aboutUs" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/mentionlegale" element={<LegalNotice />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route
            path="/politiqueDeConfidentialite"
            element={<PrivacyPolicy />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/profil" element={<ProfileManager />} />
          <Route path="/profil/annonces" element={<ProfileAnnouncements />} />
          <Route path="/profil/messages" element={<MessagesList />} />
          <Route
            path="/profil/messages/:discussionId"
            element={<MessageThread />}
          />
          <Route path="/admin" element={<AdminModeration />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
