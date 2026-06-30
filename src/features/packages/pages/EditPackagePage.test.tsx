import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { server } from '../../../test/mocks/server';
import EditPackagePage from './EditPackagePage';

function renderEditPackage() {
  return render(
    <MemoryRouter initialEntries={['/packages/7/edit']}>
      <Routes>
        <Route path="/packages/:id/edit" element={<EditPackagePage />} />
        <Route path="/" element={<h1>Accueil</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

const packageResponse = {
  id: 7,
  content: 'Livres',
  weight: 4,
  size: '40 x 30 x 20 cm',
  departureCity: 'Fort-de-France',
  picture: '',
};

test('submits the validated package update and navigates home', async () => {
  const user = userEvent.setup();
  let updatePayload: FormData | undefined;
  server.use(
    http.get('*/package/7', () => HttpResponse.json(packageResponse)),
    http.put('*/editpackage/7', async ({ request }) => {
      updatePayload = await request.formData();
      return HttpResponse.json(packageResponse);
    })
  );

  renderEditPackage();
  expect(await screen.findByDisplayValue('Livres')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Enregistrer' }));

  expect(
    await screen.findByRole('heading', { name: 'Accueil' })
  ).toBeInTheDocument();
  expect(updatePayload?.get('content')).toBe('Livres');
  expect(updatePayload?.get('weight')).toBe('4');
  expect(updatePayload?.get('departureCity')).toBe('Fort-de-France');
});

test('shows an update error in the package form', async () => {
  const user = userEvent.setup();
  server.use(
    http.get('*/package/7', () => HttpResponse.json(packageResponse)),
    http.put('*/editpackage/7', () =>
      HttpResponse.json({ message: 'Package update failed' }, { status: 422 })
    )
  );

  renderEditPackage();
  expect(await screen.findByDisplayValue('Livres')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Enregistrer' }));

  expect(await screen.findByRole('alert')).toHaveTextContent(
    'Package update failed'
  );
});
