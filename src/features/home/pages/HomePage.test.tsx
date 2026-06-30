import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import HomePage from './HomePage';

vi.mock('../../announcements/components/AnnouncementCarousel', () => ({
  default: () => <section aria-label="Annonces à la une" />,
}));

test('renders the home screen labels and canonical action links', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', { name: 'Que veux tu faire ?' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Assurance' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('img', { name: 'logo Chaye Assurance' })
  ).toBeVisible();
  expect(screen.getByRole('link', { name: "J'expédie" })).toHaveAttribute(
    'href',
    '/packages/new'
  );
  expect(screen.getByRole('link', { name: 'Je transporte' })).toHaveAttribute(
    'href',
    '/announcements/new'
  );
  for (const category of [
    'Caraïbes',
    'Europe',
    'Amérique',
    'Afrique',
    'Asie',
  ]) {
    expect(
      screen.queryByRole('link', { name: category })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: category })).toBeInTheDocument();
  }
});
