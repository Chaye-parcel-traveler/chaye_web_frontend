/* eslint-disable react-refresh/only-export-components */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AccountStatus,
  AccountStatusResponse,
  getCurrentAccountStatus,
} from './API/apiManager';

const restrictedStatuses: AccountStatus[] = ['suspended', 'banned'];

const defaultStatus: AccountStatusResponse = {
  status: 'active',
};

export const useAccountRestrictions = () => {
  const [accountStatus, setAccountStatus] =
    useState<AccountStatusResponse>(defaultStatus);

  useEffect(() => {
    const localStatus = window.localStorage.getItem(
      'chaye_account_status',
    ) as AccountStatus | null;

    if (localStatus && isAccountStatus(localStatus)) {
      setAccountStatus({
        status: localStatus,
        reason:
          window.localStorage.getItem('chaye_account_status_reason') ?? '',
      });
      return;
    }

    getCurrentAccountStatus()
      .then(setAccountStatus)
      .catch(() => setAccountStatus(defaultStatus));
  }, []);

  return {
    accountStatus,
    isRestricted: restrictedStatuses.includes(accountStatus.status),
  };
};

const AccountStatusNotice = () => {
  const { accountStatus, isRestricted } = useAccountRestrictions();

  if (!isRestricted) {
    return null;
  }

  return (
    <Notice role="status">
      <strong>
        Compte {accountStatus.status === 'banned' ? 'banni' : 'suspendu'}
      </strong>
      <span>
        Les actions publier, réserver et envoyer un message sont indisponibles.
        {accountStatus.reason ? ` Motif : ${accountStatus.reason}` : ''}
      </span>
    </Notice>
  );
};

const isAccountStatus = (value: string): value is AccountStatus =>
  ['active', 'suspended', 'banned'].includes(value);

const Notice = styled.div`
  background: #fff1ef;
  border-left: 4px solid #ec634e;
  border-radius: 8px;
  color: #9d1c12;
  display: grid;
  gap: 4px;
  margin: 20px auto;
  max-width: 960px;
  padding: 14px 18px;

  strong {
    font-size: 16px;
  }

  span {
    font-size: 14px;
    line-height: 1.45;
  }
`;

export default AccountStatusNotice;
