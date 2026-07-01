import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

import { server } from '../../../test/mocks/server';
import NewAnnouncementPage from './NewAnnouncementPage';

vi.mock('../../../components/Header', () => ({
  default: () => <header>Chaye</header>,
}));

function renderAnnouncementForm() {
  return render(
    <MemoryRouter initialEntries={['/announcements/new']}>
      <Routes>
        <Route path="/announcements/new" element={<NewAnnouncementPage />} />
        <Route path="/announcements" element={<h1>Annonces</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

async function fillAnnouncementForm() {
  const user = userEvent.setup();

  await user.type(
    screen.getByPlaceholderText('Fort de France'),
    'Fort-de-France'
  );
  await user.type(screen.getByPlaceholderText('Paris'), 'Paris');
  await user.type(screen.getByPlaceholderText('Description'), 'Deux valises');
  await user.type(screen.getByPlaceholderText('Kg disponible *'), '15');
  await user.type(screen.getByPlaceholderText('Prix au kilo'), '8');

  return user;
}

describe('announcement creation form', () => {
  it('submits the expected payload and navigates on success', async () => {
    let announcementPayload: unknown;
    server.use(
      http.post('*/announcements', async ({ request }) => {
        announcementPayload = await request.json();
        return HttpResponse.json({ id: 7 }, { status: 201 });
      })
    );

    renderAnnouncementForm();
    expect(screen.getByTestId('announcement-form')).toBeInTheDocument();
    const user = await fillAnnouncementForm();
    await user.click(
      screen.getByRole('button', { name: 'Publier votre annonce' })
    );

    expect(
      await screen.findByRole('heading', { name: 'Annonces' })
    ).toBeInTheDocument();
    expect(announcementPayload).toEqual({
      departingFrom: 'Fort-de-France',
      arrivingAt: 'Paris',
      description: 'Deux valises',
      weightAvailability: 15,
      price: 8,
      type: 'shipping',
    });
  });

  it('displays the backend error and keeps the form open', async () => {
    server.use(
      http.post('*/announcements', () =>
        HttpResponse.json(
          { message: 'Announcement payload is invalid' },
          { status: 422 }
        )
      )
    );

    renderAnnouncementForm();
    const user = await fillAnnouncementForm();
    await user.click(
      screen.getByRole('button', { name: 'Publier votre annonce' })
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Announcement payload is invalid'
    );
    expect(
      screen.getByRole('button', { name: 'Publier votre annonce' })
    ).toBeInTheDocument();
  });

  it('blocks an invalid payload and focuses the first field', async () => {
    const user = userEvent.setup();
    let requestCount = 0;
    server.use(
      http.post('*/announcements', () => {
        requestCount += 1;
        return HttpResponse.json({ id: 7 }, { status: 201 });
      })
    );

    renderAnnouncementForm();
    await user.click(
      screen.getByRole('button', { name: 'Publier votre annonce' })
    );

    expect(
      await screen.findByText('Le lieu de départ est requis.')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Départ de')).toHaveFocus();
    expect(requestCount).toBe(0);
  });
});
