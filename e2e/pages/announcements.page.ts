import type { Locator, Page } from '@playwright/test';

type AnnouncementFormValues = {
  departingFrom: string;
  arrivingAt: string;
  description: string;
  weightAvailability: number;
  price: number;
};

export class AnnouncementsPage {
  readonly form: Locator;

  constructor(private readonly page: Page) {
    this.form = page.getByTestId('announcement-form');
  }

  async openCreationForm(): Promise<void> {
    await this.page.goto('/announcements/new');
  }

  async submit(values: AnnouncementFormValues): Promise<void> {
    await this.form.getByLabel('Départ de').fill(values.departingFrom);
    await this.form.getByLabel('Arrivée à').fill(values.arrivingAt);
    await this.form.getByLabel('Description').fill(values.description);
    await this.form
      .getByLabel('Poids disponible en kg')
      .fill(String(values.weightAvailability));
    await this.form.getByLabel('Prix au kilo').fill(String(values.price));
    await this.form
      .getByRole('button', { name: 'Publier votre annonce' })
      .click();
  }
}
