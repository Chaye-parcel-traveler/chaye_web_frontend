# Chaye Web Frontend Quality Gates

This document defines the checks every agent must run before handing frontend work back.

Last updated: 2026-06-28.

## Runtime Policy

Local frontend commands must run through Docker Compose. Node.js and npm are not local prerequisites.

GitHub Actions uses Node.js 24 directly through `actions/setup-node`. This keeps CI output split into explicit lint, test, typecheck, and build steps while matching the Node.js major used by Docker.

## Required Gates For Code Changes

Run this from `chaye_web_frontend/` after any frontend code change:

```bash
docker compose run --rm frontend-tools npm ci
docker compose run --rm frontend-tools npm run check
```

Meaning:

| Gate      | Command                                                               | Purpose                                                    |
| --------- | --------------------------------------------------------------------- | ---------------------------------------------------------- |
| Install   | `docker compose run --rm frontend-tools npm ci`                       | Recreates dependencies from the lockfile under Node.js 24. |
| Lint      | `docker compose run --rm frontend-tools npm run lint`                 | Runs ESLint on frontend source files.                      |
| Tests     | `docker compose run --rm frontend-tools npm test -- --watchAll=false` | Runs Vitest once.                                          |
| Typecheck | `docker compose run --rm frontend-tools npm run typecheck`            | Runs TypeScript without emitting files.                    |
| Build     | `docker compose run --rm frontend-tools npm run build`                | Verifies production bundle compilation.                    |
| All gates | `docker compose run --rm frontend-tools npm run check`                | Runs lint, typecheck, tests, and build in sequence.        |

## Required Gates For API Integration Changes

For changes involving Axios calls, auth flow, forms, routes, or backend contracts:

Run the same Docker Compose commands used for code changes.

Also verify manually from code review that:

- New API calls use Axios base URL, not hardcoded `localhost`.
- Form field names match backend validators.
- `VITE_API_URL` remains the API URL source.
- Backend security controls are not replaced by frontend-only disabled buttons.

## Required Gates For Docker/Deployment Changes

Run this after every code change, and especially when `Dockerfile`, `captain-definition`, or API URL build behavior changes:

```bash
docker compose build frontend-production
```

If practical, run the image:

```bash
docker compose up frontend-production
```

Then verify the app is served at:

```text
http://localhost:3000
```

## Required Gates For Documentation-Only Changes

For docs-only changes, application tests are not required.

The agent must still check:

```bash
git status --short
```

Also run `git diff --check` and confirm that no application tests were run because only documentation or workflow files changed.

## GitHub Actions

CI does not use Docker Compose. The workflow must:

- install Node.js 24 with `actions/setup-node`;
- run `npm ci`;
- run lint, tests, typecheck, and build as separate steps;
- build the production Docker image.

## Missing Gates To Add Later

The frontend repo still lacks focused E2E smoke tests for signup, login, and announcement creation.

## Failure Reporting

When a gate fails, agents must report:

- The exact command.
- Whether it was Docker Compose locally or GitHub Actions in CI.
- The failure summary.
- Whether it was caused by the current change or appears pre-existing.
- The next recommended fix.

Do not run host npm commands as a local fallback. Report Docker infrastructure failures explicitly.
