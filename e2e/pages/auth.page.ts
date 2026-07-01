import type { Locator, Page } from '@playwright/test';
import type { TestUser } from '../fixtures/users';

export class AuthPage {
  readonly loginForm: Locator;
  readonly signupForm: Locator;

  constructor(private readonly page: Page) {
    this.loginForm = page.getByTestId('login-form');
    this.signupForm = page.getByTestId('signup-form');
  }

  async open(): Promise<void> {
    await this.page.goto('/auth');
  }

  async showSignup(): Promise<void> {
    await this.page.getByRole('button', { name: 'Créer votre compte' }).click();
  }

  async signup(user: TestUser): Promise<void> {
    await this.signupForm.getByLabel('Prénom').fill(user.firstname);
    await this.signupForm
      .getByLabel('Nom', { exact: true })
      .fill(user.lastname);
    await this.signupForm.getByLabel('Adresse').fill(user.address);
    await this.signupForm.getByLabel('Téléphone').fill(user.phone);
    await this.signupForm.getByLabel('Date de naissance').fill(user.birthDate);
    await this.signupForm.getByLabel('Email').fill(user.email);
    await this.signupForm
      .getByLabel('Créer votre mot de passe')
      .fill(user.password);
    await this.signupForm
      .getByLabel('J’accepte les conditions générales')
      .check();
    await this.signupForm.getByRole('button', { name: 'Valider' }).click();
  }

  async login(credentials: { email: string; password: string }): Promise<void> {
    await this.loginForm
      .getByLabel('Adresse e-mail de connexion')
      .fill(credentials.email);
    await this.loginForm
      .getByLabel('Mot de passe de connexion')
      .fill(credentials.password);
    await this.loginForm.getByRole('button', { name: 'Valider' }).click();
  }
}
