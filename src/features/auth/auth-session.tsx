import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { onApiUnauthorized } from '../../lib/api-client';
import type { MemberProfile } from '../members/api/member.types';
import {
  AuthSessionRequestError,
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
  const [sessionError, setSessionError] = useState<string | null>(null);

  const syncFromAuthStore = useCallback(() => {
    setMember(getStoredMember());
  }, []);

  const refreshSession = useCallback(async () => {
    try {
      const nextMember = await getCurrentSessionMember();
      setSessionError(null);
      setMember(nextMember);
      return nextMember;
    } catch (error) {
      if (error instanceof AuthSessionRequestError && error.status === 401) {
        clearAuthSession();
        setSessionError(null);
        setMember(null);
        return null;
      }

      setSessionError(
        error instanceof Error
          ? error.message
          : 'Session impossible à vérifier.',
      );
      throw error;
    }
  }, []);

  useEffect(() => {
    removeLegacyAuthStorage();

    let isMounted = true;

    getCurrentSessionMember()
      .then((nextMember) => {
        if (isMounted) {
          setSessionError(null);
          setMember(nextMember);
        }
      })
      .catch((error) => {
        if (isMounted) {
          if (
            error instanceof AuthSessionRequestError &&
            error.status === 401
          ) {
            clearAuthSession();
            setSessionError(null);
            setMember(null);
            return;
          }

          setSessionError(
            error instanceof Error
              ? error.message
              : 'Session impossible à vérifier.',
          );
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
        setSessionError(null);
        setMember(null);
      }),
    [],
  );

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(member),
      isLoading,
      member,
      sessionError,
      refreshSession,
    }),
    [isLoading, member, refreshSession, sessionError],
  );

  return (
    <AuthSessionContext.Provider value={value}>
      {children}
    </AuthSessionContext.Provider>
  );
}
