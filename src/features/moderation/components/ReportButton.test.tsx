import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { appEnv } from '../../../config/env';
import { server } from '../../../test/mocks/server';
import ReportButton from './ReportButton';

const apiUrl = appEnv.apiUrl;

describe('ReportButton', () => {
  it('submits a report from the modal form', async () => {
    const user = userEvent.setup();

    server.use(
      http.post(`${apiUrl}/reports`, async ({ request }) => {
        expect(await request.json()).toMatchObject({
          description: 'Le contenu est incohérent.',
          reason: 'Annonce trompeuse',
          targetId: 42,
          targetType: 'announcement',
        });

        return HttpResponse.json({ id: 9 }, { status: 201 });
      }),
    );

    render(
      <ReportButton
        targetId={42}
        targetLabel="cette annonce"
        targetType="announcement"
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Signaler' }));
    await user.selectOptions(screen.getByLabelText('Motif'), [
      'Annonce trompeuse',
    ]);
    await user.type(
      screen.getByLabelText('Description optionnelle'),
      'Le contenu est incohérent.',
    );
    await user.click(screen.getByRole('button', { name: 'Envoyer' }));

    expect(
      await screen.findByText(
        'Signalement transmis. Notre équipe va le vérifier.',
      ),
    ).toBeInTheDocument();
  });
});
