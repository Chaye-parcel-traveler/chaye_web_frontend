import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';

import { server } from '../../../test/mocks/server';
import CommentForm from './CommentForm';

test('opens an accessible comment form and restores focus when closed', async () => {
  const user = userEvent.setup();
  server.use(
    http.get('*/me', () =>
      HttpResponse.json({
        id: 42,
        email: 'lea@example.test',
      })
    )
  );

  render(<CommentForm announcementId={7} />);

  const openButton = screen.getByRole('button', { name: 'Commenter' });
  await user.click(openButton);

  expect(
    screen.getByRole('dialog', { name: 'Commentaires' })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('combobox', { name: 'Notez notre site' })
  ).toHaveAttribute('name', 'ratingStars');
  expect(
    screen.getByRole('textbox', { name: 'Laissez un commentaire :' })
  ).toHaveAttribute('name', 'content');

  const closeButtons = screen.getAllByRole('button', { name: 'Fermer' });
  await user.click(closeButtons[closeButtons.length - 1]!);

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(openButton).toHaveFocus();
});
