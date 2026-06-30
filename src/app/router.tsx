import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

const AboutPage = lazy(() => import('../features/about/pages/AboutPage'));
const AnnouncementsPage = lazy(
  () => import('../features/announcements/pages/AnnouncementsPage')
);
const NewAnnouncementPage = lazy(
  () => import('../features/announcements/pages/NewAnnouncementPage')
);
const AuthPage = lazy(() => import('../features/auth/pages/AuthPage'));
const HomePage = lazy(() => import('../features/home/pages/HomePage'));
const LegalNoticePage = lazy(
  () => import('../features/legal/pages/LegalNoticePage')
);
const PrivacyPolicyPage = lazy(
  () => import('../features/legal/pages/PrivacyPolicyPage')
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
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/loginSignup" element={<Navigate replace to="/auth" />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
