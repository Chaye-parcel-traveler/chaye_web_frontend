import { uniqueValue } from '../support/unique';

export type TestUser = {
  address: string;
  birthDate: string;
  country: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
  phone: string;
};

export function createTestUser(): TestUser {
  const password = 'E2ePassword123!';
  const phoneSuffix = Date.now().toString().slice(-8);

  return {
    address: '1 rue des tests',
    birthDate: '1990-01-01',
    country: 'France',
    email: `${uniqueValue('e2e-signup')}@chaye.test`,
    firstname: 'Camille',
    lastname: 'E2E',
    password,
    passwordConfirmation: password,
    phone: `+336${phoneSuffix}`,
  };
}
