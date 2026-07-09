import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

test('renders the fonctionnality_bases home sections and action links', () => {
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
  expect(screen.getByRole('heading', { name: 'A la une' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Vos avis' })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Les Régions du monde' })
  ).toBeInTheDocument();

  expect(screen.getByRole('link', { name: "J'expédie" })).toHaveAttribute(
    'href',
    '/sender'
  );
  expect(screen.getByRole('link', { name: 'Je transporte' })).toHaveAttribute(
    'href',
    '/carrier'
  );

  for (const category of [
    'Caraïbes',
    'Europe',
    'Amérique',
    'Afrique',
    'Asie',
  ]) {
    expect(screen.getByRole('heading', { name: category })).toBeInTheDocument();
  }
});
