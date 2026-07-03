import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import Footer from './Footer';

test('navigates to legal pages through React Router', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={['/']}>
      <Footer />
      <Routes>
        <Route path="/" element={null} />
        <Route path="/legal-notice" element={<h1>Mentions légales</h1>} />
      </Routes>
    </MemoryRouter>
  );

  await user.click(screen.getByRole('link', { name: 'Mentions légales' }));

  expect(
    screen.getByRole('heading', { name: 'Mentions légales' })
  ).toBeInTheDocument();
});
