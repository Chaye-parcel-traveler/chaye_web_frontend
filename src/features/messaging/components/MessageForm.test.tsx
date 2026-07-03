import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import MessageForm from './MessageForm';

test('opens an accessible message form and restores focus when closed', async () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <MessageForm recipient="alex@example.test" />
    </MemoryRouter>
  );

  const openButton = screen.getByRole('button', { name: 'message' });
  await user.click(openButton);

  expect(screen.getByRole('dialog', { name: 'Message' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Message:' })).toBeInTheDocument();

  const closeButtons = screen.getAllByRole('button', { name: 'Fermer' });
  await user.click(closeButtons[closeButtons.length - 1]!);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(openButton).toHaveFocus();
});
