import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../../test/mocks/server';
import AnnouncementsPage from './AnnouncementsPage';

const trips = [
  {
    id: 1,
    departingFrom: 'Paris',
    arrivingAt: 'Fort-de-France',
    departureDate: '2026-07-18',
    description: 'Vol direct avec remise à l’aéroport.',
    weightAvailability: 12,
    price: 9,
    memberId: 42,
  },
  {
    id: 2,
    departingFrom: 'Bordeaux',
    arrivingAt: 'Dakar',
    departureDate: '2026-07-24',
    weightAvailability: 5,
    price: 8,
  },
];

function renderPage() {
  return render(
    <MemoryRouter>
      <AnnouncementsPage />
    </MemoryRouter>
  );
}

test('renders comparable trip results from the API', async () => {
  server.use(
    http.get('*/announcements', () => HttpResponse.json(trips, { status: 200 }))
  );

  renderPage();

  expect(screen.getByRole('status')).toHaveTextContent(
    'Recherche des prochains trajets'
  );
  const results = await screen.findAllByTestId('trip-result');
  expect(results[0]).toHaveTextContent('Fort-de-France');
  expect(results[1]).toHaveTextContent('Dakar');
  expect(screen.getByText('Corridor outre-mer')).toBeInTheDocument();
  expect(screen.getByText('Corridor Afrique')).toBeInTheDocument();
  expect(results).toHaveLength(2);
  expect(screen.getByRole('link', { name: 'Voir le profil' })).toHaveAttribute(
    'href',
    '/members/42'
  );
});

test('filters trips by destination and offers a reset when none match', async () => {
  const user = userEvent.setup();
  server.use(
    http.get('*/announcements', () => HttpResponse.json(trips, { status: 200 }))
  );

  renderPage();
  await screen.findAllByTestId('trip-result');

  await user.type(screen.getByLabelText('Destination'), 'Dakar');

  expect(screen.getAllByTestId('trip-result')).toHaveLength(1);
  expect(screen.getByTestId('trip-result')).toHaveTextContent('Dakar');
  expect(screen.getByTestId('trip-result')).not.toHaveTextContent(
    'Fort-de-France'
  );

  await user.clear(screen.getByLabelText('Destination'));
  await user.type(screen.getByLabelText('Destination'), 'Montréal');

  expect(
    screen.getByRole('heading', {
      name: 'Aucun trajet ne correspond à cette recherche.',
    })
  ).toBeInTheDocument();

  await user.click(
    screen.getByRole('button', { name: 'Réinitialiser la recherche' })
  );

  expect(await screen.findAllByTestId('trip-result')).toHaveLength(2);
});

test('renders a useful empty state when no trip is published', async () => {
  server.use(
    http.get('*/announcements', () => HttpResponse.json([], { status: 200 }))
  );

  renderPage();

  expect(
    await screen.findByRole('heading', {
      name: 'Les premiers trajets arrivent bientôt.',
    })
  ).toBeInTheDocument();
  expect(
    screen
      .getAllByRole('link', { name: 'Proposer un trajet' })
      .every((link) => link.getAttribute('href') === '/announcements/new')
  ).toBe(true);
});

test('reveals long result sets progressively', async () => {
  const user = userEvent.setup();
  const longResultSet = Array.from({ length: 10 }, (_, index) => ({
    ...trips[index % trips.length],
    id: index + 1,
    description: `Trajet ${index + 1}`,
  }));

  server.use(
    http.get('*/announcements', () =>
      HttpResponse.json(longResultSet, { status: 200 })
    )
  );

  renderPage();

  expect(await screen.findAllByTestId('trip-result')).toHaveLength(8);
  await user.click(
    screen.getByRole('button', { name: /Afficher plus de trajets/ })
  );
  expect(screen.getAllByTestId('trip-result')).toHaveLength(10);
});
