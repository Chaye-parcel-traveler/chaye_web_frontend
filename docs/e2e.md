# Stack E2E complète

Cette page décrit l'exécution end-to-end qui démarre le frontend, l'API et
MariaDB dans une stack isolée.

## Source de vérité

| Élément               | Source                                                |
| --------------------- | ----------------------------------------------------- |
| Frontend              | Ce dépôt `chaye_web_frontend`                         |
| Contrats HTTP côté UI | `src/features/*/api`, tests MSW, scénarios Playwright |
| Backend               | Dépôt privé `Chaye-parcel-traveler/chaye_API`         |
| Base de données       | Migrations et seeders du dépôt API                    |
| Orchestration E2E     | `compose.e2e.yml`                                     |
| Scénarios navigateur  | `e2e/specs`                                           |

Le frontend ne définit pas le schéma MariaDB. Il consomme l'API. Le backend est
la source de vérité pour les migrations, les contraintes de base de données, les
statuts serveur et les règles d'autorisation.

## Services Compose

`compose.e2e.yml` démarre :

- `db-e2e` : MariaDB 11 en `tmpfs`, isolée et jetable;
- `api-e2e` : API AdonisJS depuis `E2E_API_DIR`;
- `frontend-e2e` : Vite en mode dev exposé dans le réseau Compose;
- `e2e` : Playwright Chromium;
- `e2e-control` : volume de coordination pour arrêter proprement la stack API.

## Lancement local

Préparer le chemin API si le dépôt n'est pas à l'emplacement par défaut :

```bash
export E2E_API_DIR=/chemin/vers/chaye_API
```

Lancer :

```bash
docker compose -f compose.e2e.yml build frontend-e2e e2e
docker compose -f compose.e2e.yml run --rm e2e
docker compose -f compose.e2e.yml down --volumes --remove-orphans
```

Raccourcis package :

```bash
pnpm run dev:e2e-stack
pnpm run e2e:stack
```

Si des ports locaux sont déjà utilisés :

```bash
E2E_DB_PORT=33307 \
E2E_API_PORT=33333 \
E2E_FRONTEND_PORT=33000 \
docker compose -f compose.e2e.yml run --rm e2e
```

## Variables utilisées

| Variable              | Défaut Compose             | Usage                         |
| --------------------- | -------------------------- | ----------------------------- |
| `E2E_API_DIR`         | `../chaye_API`             | Chemin local du backend       |
| `E2E_DB_PORT`         | `3307`                     | Port MariaDB exposé sur hôte  |
| `E2E_API_PORT`        | `3333`                     | Port API exposé sur hôte      |
| `E2E_FRONTEND_PORT`   | `3000`                     | Port frontend exposé sur hôte |
| `PLAYWRIGHT_BASE_URL` | `http://frontend-e2e:3000` | URL navigateur dans Compose   |
| `E2E_API_URL`         | `http://api-e2e:3333`      | URL API pour helpers E2E      |
| `VITE_API_URL`        | `http://api-e2e:3333`      | URL API injectée au frontend  |
| `VITE_API_ASSETS_URL` | `http://api-e2e:3333`      | Base URL des assets API       |
| `VITE_APP_ENV`        | `e2e`                      | Environnement frontend        |
| `VITE_E2E`            | `true`                     | Flag frontend E2E             |

## GitHub Actions

Le workflow manuel `.github/workflows/manual-e2e.yml` exécute cette même stack.
Il :

- checkout ce dépôt dans `chaye_web_frontend`;
- checkout `Chaye-parcel-traveler/chaye_API` via `CI_REPO_READ_TOKEN`;
- build les images `frontend-e2e` et `e2e`;
- lance `docker compose -f compose.e2e.yml run --rm e2e`;
- publie `playwright-report` uniquement en cas d'échec;
- démonte la stack avec `down --volumes --remove-orphans`.

Règle de sécurité : ce workflow reste en `workflow_dispatch` uniquement, car il
utilise un secret pour lire le dépôt API privé.

## Débogage

En cas d'échec local :

```bash
docker compose -f compose.e2e.yml ps
docker compose -f compose.e2e.yml logs api-e2e
docker compose -f compose.e2e.yml logs frontend-e2e
```

Pour inspecter une trace Playwright :

```bash
pnpm exec playwright show-trace test-results/<scenario>/trace.zip
```

Les rapports et traces sont des artefacts temporaires et ne doivent pas être
commités.
