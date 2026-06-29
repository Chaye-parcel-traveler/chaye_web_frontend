import { GoogleOAuthProvider } from '@react-oauth/google';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import type { ReactNode } from 'react';

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
    });
  }, []);

  return (
    <GoogleOAuthProvider clientId="871900328667-bq9ic36okos7jmctp2kc00f5q9q8bv5l.apps.googleusercontent.com">
      {children}
    </GoogleOAuthProvider>
  );
}

export default AppProviders;
