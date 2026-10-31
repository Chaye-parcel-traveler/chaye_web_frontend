import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { appEnv } from '../../config/env';

export const server = setupServer(
  http.get(`${appEnv.apiUrl}/auth/csrf`, () => new HttpResponse(null)),
  http.get(
    `${appEnv.apiUrl}/me`,
    () => new HttpResponse(null, { status: 401 }),
  ),
);
