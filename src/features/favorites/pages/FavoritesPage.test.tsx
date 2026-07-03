import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import { server } from '../../../test/mocks/server';
import FavoritesPage from './FavoritesPage';

test('renders favorite announcements with an accessible member image', async () => {
  server.use(
    http.get('*/favorites', () =>
      HttpResponse.json([
        {
          id: 5,
          memberId: 7,
          destination: 'Paris',
          priceKilo: 12,
          departureDate: '2026-07-10',
          arrivalDate: '2026-07-11',
        },
      ])
    ),
    http.get('*/memberinfos', () =>
      HttpResponse.json([
        {
          _id: 7,
          firstname: 'Alex',
          lastname: 'Durand',
          imagename: '/profiles/alex.jpg',
        },
      ])
    )
  );

  render(<FavoritesPage />);

  expect(
    await screen.findByAltText('Profil de Alex Durand')
  ).toBeInTheDocument();
  expect(screen.getByText('Paris')).toBeInTheDocument();
});
