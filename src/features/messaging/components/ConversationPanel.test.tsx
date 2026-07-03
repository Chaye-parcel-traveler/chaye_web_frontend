import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';

import { server } from '../../../test/mocks/server';
import ConversationPanel from './ConversationPanel';

test('opens a reply dialog with an accessible message field', async () => {
  const user = userEvent.setup();
  server.use(
    http.get('*/me', () =>
      HttpResponse.json({
        id: 42,
        email: 'lea@example.test',
      })
    ),
    http.get('*/memberinfos', () =>
      HttpResponse.json([
        {
          _id: 7,
          email: 'alex@example.test',
          firstname: 'Alex',
          lastname: 'Durand',
          imagename: '/profiles/alex.jpg',
        },
      ])
    ),
    http.get('*/messages', () =>
      HttpResponse.json([
        {
          id: 1,
          sender: 'alex@example.test',
          recipient: 'lea@example.test',
          message: 'Bonjour Léa',
          datetime: '2026-07-01T12:00:00.000Z',
        },
      ])
    )
  );

  render(<ConversationPanel />);

  expect(
    await screen.findByAltText('Profil de Alex Durand')
  ).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Répondre' }));

  expect(
    screen.getByRole('dialog', { name: 'Répondre au message' })
  ).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'Répondre' })).toBeInTheDocument();
});
