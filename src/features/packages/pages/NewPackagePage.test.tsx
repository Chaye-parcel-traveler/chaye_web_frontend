import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import NewPackagePage from './NewPackagePage';

vi.mock('../../../components/Header', () => ({
  default: () => <header>Chaye</header>,
}));

test('validates package creation fields before submission', async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <NewPackagePage />
    </MemoryRouter>
  );

  await user.click(screen.getByRole('button', { name: 'Publier votre colis' }));

  expect(
    await screen.findByText('Le lieu de départ est requis.')
  ).toBeInTheDocument();
  expect(screen.getByLabelText('Départ de')).toHaveFocus();
});
