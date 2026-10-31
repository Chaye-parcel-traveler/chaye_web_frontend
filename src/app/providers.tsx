import type { ReactNode } from 'react';
import { AuthSessionProvider } from '../features/auth/auth-session';

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return <AuthSessionProvider>{children}</AuthSessionProvider>;
}

export default AppProviders;
