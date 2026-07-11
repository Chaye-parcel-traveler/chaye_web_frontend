import type { Locator, Page } from '@playwright/test';
import type { TestUser } from '../fixtures/users';

export class AuthPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get loginForm(): Locator {
    return this.page.locator('form').first();
  }

  async openLogin(): Promise<void> {
    await this.page.goto('/login');
  }

  async openRegister(): Promise<void> {
    await this.page.goto('/register');
  }

  async login(
    credentials: Pick<TestUser, 'email' | 'password'>,
  ): Promise<void> {
    await this.page.getByPlaceholder('Email').fill(credentials.email);
    await this.page.getByPlaceholder('Mot de passe').fill(credentials.password);
    await this.page.getByRole('button', { name: 'Valider' }).click();
  }

  async signup(user: TestUser): Promise<void> {
    await this.page.getByPlaceholder('Prénom').fill(user.firstname);
    await this.page
      .getByRole('textbox', { exact: true, name: 'Nom' })
      .fill(user.lastname);
    await this.page.getByLabel('Date de naissance').fill(user.birthDate);
    await this.page.getByPlaceholder('Pays').fill(user.country);
    await this.page.getByPlaceholder('Adresse').fill(user.address);
    await this.page.getByPlaceholder('Téléphone').fill(user.phone);
    await this.page.getByPlaceholder('Email').fill(user.email);
    await this.page
      .getByPlaceholder('Créer votre mot de passe')
      .fill(user.password);
    await this.page
      .getByPlaceholder('Confirmer votre mot de passe')
      .fill(user.passwordConfirmation);
    await this.page
      .getByLabel('J’accepte les conditions générales d’utilisation de Chayé.')
      .check();
    await this.page.getByRole('button', { name: 'Valider' }).click();
  }
}
