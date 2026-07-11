import type { Page } from '@playwright/test';
import type { validShippingAnnouncement } from '../fixtures/announcements';

type ShippingAnnouncement = typeof validShippingAnnouncement;

export class AnnouncementsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openShippingForm(): Promise<void> {
    await this.page.goto('/sender');
  }

  async openList(): Promise<void> {
    await this.page.goto('/annonces');
  }

  async submitShippingAnnouncement(
    announcement: ShippingAnnouncement,
  ): Promise<void> {
    await this.page.getByPlaceholder('Paris-Orly').fill(announcement.departure);
    await this.page
      .getByPlaceholder('Aéroport Martinique Aimé Césaire')
      .fill(announcement.arrival);
    await this.page
      .getByPlaceholder('Je souhaite envoyer un colis vers Fort-de-France')
      .fill(announcement.description);
    await this.page
      .getByPlaceholder(
        'Documents administratifs, vêtements, petit matériel...',
      )
      .fill(announcement.content);
    await this.page.getByLabel('Poids colis (kg)').fill(announcement.weight);
    await this.page.getByLabel('Hauteur (cm)').fill(announcement.height);
    await this.page.getByLabel('Largeur (cm)').fill(announcement.width);
    await this.page.getByLabel('Profondeur (cm)').fill(announcement.depth);
    await this.page.getByLabel('Prix proposé (€)').fill(announcement.price);
    await this.page.getByRole('button', { name: 'Publier la demande' }).click();
  }

  async submitTransportAnnouncement(): Promise<void> {
    await this.page.getByLabel('Aéroport de départ').fill('Paris-Orly');
    await this.page
      .getByLabel('Aéroport d’arrivée')
      .fill('Aéroport Martinique Aimé Césaire');
    await this.page.getByLabel('Code IATA départ').fill('ORY');
    await this.page.getByLabel('Code IATA arrivée').fill('FDF');
    await this.page.getByLabel('Départ du vol').fill('2026-08-15T10:30');
    await this.page.getByLabel('Arrivée du vol').fill('2026-08-15T18:20');
    await this.page
      .getByLabel('Description de l’annonce')
      .fill('Je peux transporter un colis sur mon vol Paris - Fort-de-France');
    await this.page.getByLabel('Poids disponible (kg)').fill('12.3');
    await this.page.getByLabel('Hauteur max (cm)').fill('50');
    await this.page.getByLabel('Largeur max (cm)').fill('40');
    await this.page.getByLabel('Prix demandé (€)').fill('80');
    await this.page.getByRole('button', { name: 'Publier le trajet' }).click();
  }

  async fillAnnouncementFilters(): Promise<void> {
    await this.page
      .getByLabel('Filtres des annonces')
      .getByPlaceholder('Nom de l’aéroport')
      .first()
      .fill('Paris-Orly');
    await this.page
      .getByLabel('Filtres des annonces')
      .getByPlaceholder('Nom de l’aéroport')
      .nth(1)
      .fill('Aéroport Martinique Aimé Césaire');
    await this.page.getByPlaceholder('3.5 kg').fill('2');
    await this.page.getByPlaceholder('60 €').fill('100');
  }
}
