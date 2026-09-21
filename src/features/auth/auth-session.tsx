import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { onApiUnauthorized } from '../../lib/api-client';
import type { MemberProfile } from '../members/api/member.types';
import {
  clearAuthSession,
  getCurrentSessionMember,
  getStoredMember,
  onAuthChange,
  removeLegacyAuthStorage,
} from './api/auth.api';
import { AuthSessionContext } from './auth-session-context';

type AuthSessionProviderProps = {
  children: ReactNode;
};

export function AuthSessionProvider({ children }: AuthSessionProviderProps) {
  const [member, setMember] = useState<MemberProfile | null>(() =>
    getStoredMember(),
  );
  const [isLoading, setIsLoading] = useState(true);

  const syncFromAuthStore = useCallback(() => {
    setMember(getStoredMember());
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const nextMember = await getCurrentSessionMember();
      setMember(nextMember);
      return nextMember;
    } catch {
      clearAuthSession();
      setMember(null);
      return null;
    }
  }, []);

  useEffect(() => {
    removeLegacyAuthStorage();

    let isMounted = true;

    getCurrentSessionMember()
      .then((nextMember) => {
        if (isMounted) {
          setMember(nextMember);
        }
      })
      .catch(() => {
        clearAuthSession();
        if (isMounted) {
          setMember(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => onAuthChange(syncFromAuthStore), [syncFromAuthStore]);

  useEffect(
    () =>
      onApiUnauthorized(() => {
        clearAuthSession();
        setMember(null);
      }),
    [],
  );

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(member),
      isLoading,
      member,
      refreshSession,
    }),
    [isLoading, member, refreshSession],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}
