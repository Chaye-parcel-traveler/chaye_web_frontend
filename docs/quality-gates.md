# Chaye Web Frontend Quality Gates

This document defines the checks every agent must run before handing frontend work back.

Last updated: 2026-06-26.

## Current Runtime Reality

The frontend does not currently have a Docker Compose hot-reload development stack.

Agents must still test through Docker first.

Use a one-shot Node container for normal frontend validation, then use Docker to validate the production image build.

Host commands are only a documented fallback when Docker is unavailable or broken for infrastructure reasons.

## Required Gates For Code Changes

Run this from `chaye_web_frontend/` after any frontend code change:

```bash
docker run --rm \
  -v "$PWD":/app \
  -v chaye_web_frontend_node_modules:/app/node_modules \
  -w /app \
  -e VITE_API_URL=http://host.docker.internal:3333 \
  node:20-alpine \
  sh -lc "npm ci && npm run lint && npm test -- --watchAll=false && npm run typecheck && npm run build"
```

Meaning:

| Gate | Command | Purpose |
| --- | --- | --- |
| Lint | `npm run lint` inside Docker | Runs ESLint on frontend source files. |
| Tests | `npm test -- --watchAll=false` inside Docker | Runs Vitest once. The legacy CRA `--watchAll=false` flag is accepted for workflow compatibility. |
| Typecheck | `npm run typecheck` inside Docker | Runs TypeScript without emitting files. |
| Build | `npm run build` inside Docker | Verifies production bundle compilation. |

## Required Gates For API Integration Changes

For changes involving Axios calls, auth flow, forms, routes, or backend contracts:

```bash
docker run --rm \
  -v "$PWD":/app \
  -v chaye_web_frontend_node_modules:/app/node_modules \
  -w /app \
  -e VITE_API_URL=http://host.docker.internal:3333 \
  node:20-alpine \
  sh -lc "npm ci && npm run lint && npm test -- --watchAll=false && npm run typecheck && npm run build"
```

Also verify manually from code review that:

- New API calls use Axios base URL, not hardcoded `localhost`.
- Form field names match backend validators.
- `VITE_API_URL` remains the API URL source.
- Backend security controls are not replaced by frontend-only disabled buttons.

## Required Gates For Docker/Deployment Changes

For all code changes, and especially if `Dockerfile`, `captain-definition`, or API URL build behavior changes, run:

```bash
docker build --build-arg VITE_API_URL=http://localhost:3333 -t chaye-web-frontend .
```

If practical, run the image:

```bash
docker run --rm -p 3000:80 chaye-web-frontend
```

Then verify the app is served at:

```text
http://localhost:3000
```

## Required Gates For Documentation-Only Changes

For docs-only changes, tests are not required.

The agent must still check:

```bash
git status --short
```

And confirm in the final response that no code tests were run because only documentation changed.

## Missing Gates To Add Later

The frontend repo currently lacks:

- Docker Compose development service.
- E2E tests.

Recommended later tickets:

- Add frontend Docker Compose service.
- Add a focused E2E smoke test for signup, login, and announcement creation once backend contracts stabilize.

## Failure Reporting

When a gate fails, agents must report:

- The exact command.
- Whether it was Docker execution or a documented host fallback.
- The failure summary.
- Whether it was caused by the current change or appears pre-existing.
- The next recommended fix.

Do not mark work complete if a required gate fails unless the failure is clearly pre-existing or infrastructure-related and that is documented.
