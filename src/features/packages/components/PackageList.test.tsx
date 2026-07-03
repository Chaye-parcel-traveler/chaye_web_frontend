import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import { server } from '../../../test/mocks/server';
import PackageList from './PackageList';

test('announces loading and exposes contextual package image text', async () => {
  server.use(
    http.get('*/packages', () =>
      HttpResponse.json([
        {
          id: 3,
          content: 'livres',
          departureCity: 'Fort-de-France',
          picture: '/packages/books.jpg',
          weight: 4,
          size: '40 × 30',
          creationDate: '2026-07-01T12:00:00.000Z',
        },
      ])
    )
  );

  render(<PackageList />);

  expect(screen.getByRole('status')).toHaveTextContent('Chargement des colis…');
  expect(
    await screen.findByAltText('Colis contenant livres')
  ).toBeInTheDocument();
});
