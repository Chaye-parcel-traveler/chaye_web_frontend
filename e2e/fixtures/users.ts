import { uniqueValue } from '../support/unique';

export type TestUser = {
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  birthDate: string;
  email: string;
  password: string;
};

export function createTestUser(): TestUser {
  const uniquePhoneSuffix = Math.floor(Math.random() * 1_000_000)
    .toString()
    .padStart(6, '0');

  return {
    firstname: 'Camille',
    lastname: 'E2E',
    address: '1 rue des Tests',
    phone: `+596696${uniquePhoneSuffix}`,
    birthDate: '1990-01-01',
    email: `${uniqueValue('e2e-signup')}@chaye.test`,
    password: 'e2ePassword123',
  };
}
