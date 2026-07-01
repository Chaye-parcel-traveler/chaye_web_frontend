import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';

import { server } from '../../../test/mocks/server';
import AnnouncementCarousel from './AnnouncementCarousel';

test('does not expose the unavailable map as a link', async () => {
  server.use(
    http.get('*/announcements', () => HttpResponse.json([], { status: 200 }))
  );

  render(
    <MemoryRouter>
      <AnnouncementCarousel />
    </MemoryRouter>
  );

  expect(await screen.findByText("Pas d'annonces")).toBeInTheDocument();
  expect(
    screen.queryByRole('link', { name: /Carte interactive/ })
  ).not.toBeInTheDocument();
  expect(screen.getByText('Carte interactive (bientôt)')).toHaveAttribute(
    'aria-disabled',
    'true'
  );
});

test('exposes announcement cards through a stable selector', async () => {
  server.use(
    http.get('*/announcements', () =>
      HttpResponse.json(
        [
          {
            id: 1,
            arrivingAt: 'Paris',
            weightAvailability: 10,
            price: 25,
          },
        ],
        { status: 200 }
      )
    )
  );

  render(
    <MemoryRouter>
      <AnnouncementCarousel />
    </MemoryRouter>
  );

  expect(await screen.findByTestId('announcement-card')).toHaveTextContent(
    'Paris'
  );
});
