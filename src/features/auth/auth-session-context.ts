import { createContext, useContext } from 'react';
import type { MemberProfile } from '../members/api/member.types';

export type AuthSessionContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  member: MemberProfile | null;
  refreshSession: () => Promise<MemberProfile | null>;
};

export const AuthSessionContext = createContext<AuthSessionContextValue | null>(
  null,
);

export const useAuthSession = () => {
  const context = useContext(AuthSessionContext);

  if (!context) {
    throw new Error('useAuthSession must be used inside AuthSessionProvider');
  }

  return context;
};
