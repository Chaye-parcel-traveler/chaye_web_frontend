import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { appEnv } from '../../../config/env';
import { server } from '../../../test/mocks/server';
import {
  getDiscussionMessages,
  getDiscussions,
  sendDiscussionMessage,
} from './messages.api';

const apiUrl = appEnv.apiUrl;

describe('messages API', () => {
  it('loads and normalizes discussions with auth', async () => {
    window.localStorage.setItem('chaye_auth_token', 'message-token');

    server.use(
      http.get(`${apiUrl}/tchat-discussions`, ({ request }) => {
        expect(request.headers.get('authorization')).toBe(
          'Bearer message-token',
        );

        return HttpResponse.json({
          data: [
            {
              discussion_opener_id: 1,
              discussion_receiver_id: 2,
              id: 5,
              peer: { firstname: 'Fatou', id: 2, lastname: 'Bernard' },
            },
          ],
        });
      }),
    );

    await expect(getDiscussions()).resolves.toMatchObject([
      {
        discussionOpenerId: 1,
        discussionReceiverId: 2,
        id: 5,
        peer: { firstname: 'Fatou' },
      },
    ]);
  });

  it('loads and sends messages through discussion endpoints', async () => {
    window.localStorage.setItem('chaye_auth_token', 'message-token');

    server.use(
      http.get(`${apiUrl}/tchat-discussions/5/messages`, () =>
        HttpResponse.json([
          {
            content: 'Bonjour',
            discussion_id: 5,
            id: 10,
            member_id: 2,
          },
        ]),
      ),
      http.post(
        `${apiUrl}/tchat-discussions/5/messages`,
        async ({ request }) => {
          expect(await request.json()).toEqual({ content: 'Réponse' });

          return HttpResponse.json(
            {
              content: 'Réponse',
              discussion_id: 5,
              id: 11,
              member_id: 1,
            },
            { status: 201 },
          );
        },
      ),
    );

    await expect(getDiscussionMessages(5)).resolves.toHaveLength(1);
    await expect(sendDiscussionMessage(5, 'Réponse')).resolves.toMatchObject({
      content: 'Réponse',
      discussionId: 5,
      id: 11,
    });
  });
});
