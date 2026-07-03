import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import HomePage from './HomePage';

test('renders the homepage promise and canonical action links', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );

  expect(
    screen.getByRole('heading', { name: 'La confiance voyage avec vous.' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', {
      name: 'Un même réseau, deux façons de participer.',
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: 'J’expédie un colis' })
  ).toHaveAttribute('href', '/packages/new');
  expect(
    screen.getByRole('link', { name: 'Je propose un trajet' })
  ).toHaveAttribute('href', '/announcements/new');
  expect(screen.getByText(/Martinique · Guadeloupe/)).toBeInTheDocument();
  expect(screen.getByText(/Sénégal · Mali/)).toBeInTheDocument();
});
