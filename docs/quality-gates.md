# Quality gates

## CI automatique

Le workflow `.github/workflows/ci.yml` s'exécute sur `push` et
`pull_request`. Il lance `pnpm run check`, qui vérifie :

- `pnpm run lint`
- `pnpm run format:check`
- `pnpm run typecheck`
- `pnpm run test`
- `pnpm run coverage`
- `pnpm run build`

Ce workflow ne récupère pas le dépôt privé API et ne consomme pas de secret.

## Docker workflow

Le workflow `.github/workflows/docker.yml` s'exécute sur `push` et
`pull_request`. Il build :

- l'image production `target=production`;
- l'image E2E `target=e2e`.

Il utilise le cache GitHub Actions de Buildx pour réutiliser les couches Docker,
notamment la couche `playwright-browsers` qui contient Chromium.

## Manual E2E workflow

The frontend repository contains a manual GitHub Actions workflow:

- workflow: `.github/workflows/manual-e2e.yml`
- trigger: `workflow_dispatch` only
- input: `api_ref`, default `master`

La stack exécutée par ce workflow est documentée dans [`docs/e2e.md`](e2e.md).

The workflow does not run on `push` or `pull_request`. Do not add
`pull_request_target`; the job uses a secret to checkout the private API
repository and must not run automatically for untrusted fork code.

Required secret in `chaye_web_frontend`:

- `CI_REPO_READ_TOKEN`

The token must have read-only contents access to
`Chaye-parcel-traveler/chaye_API`. It must not be printed in logs.

Manual launch:

1. Open GitHub Actions in `chaye_web_frontend`.
2. Select `Manual E2E`.
3. Click `Run workflow`.
4. Keep `api_ref=master` or provide the API branch, tag or SHA to test.

The workflow:

- checks out `chaye_web_frontend`;
- checks out `Chaye-parcel-traveler/chaye_API` with `CI_REPO_READ_TOKEN`;
- builds the E2E Docker images from `compose.e2e.yml`;
- starts MariaDB, the API, the frontend and Playwright through Docker Compose;
- builds the frontend with `VITE_API_URL=http://api-e2e:3333`;
- runs Playwright against `http://frontend-e2e:3000`;
- uploads the Playwright report only when the job fails;
- always stops the Compose stack after the run.
