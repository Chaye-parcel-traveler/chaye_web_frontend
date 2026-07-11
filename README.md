# Chaye Web Frontend

Application web Chaye basée sur React 18, TypeScript, Vite, Axios, Zod,
React Hook Form, Vitest et Playwright.

## Sources de vérité

| Sujet                 | Source                                                                                             |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| Périmètre et statut   | GitHub Issues et Pull Requests                                                                     |
| Contrat backend       | `../chaye_API` et endpoints réellement exposés                                                     |
| Qualité et CI         | [`docs/quality-gates.md`](docs/quality-gates.md)                                                   |
| Architecture frontend | [`docs/architecture.md`](docs/architecture.md)                                                     |
| Tests                 | [`docs/testing.md`](docs/testing.md)                                                               |
| Stack E2E complète    | [`docs/e2e.md`](docs/e2e.md)                                                                       |
| Diagrammes            | [`docs/diagrams.md`](docs/diagrams.md)                                                             |
| Analyse scan billet   | [`docs/analyse_lecture_billet_avion_frontend.pdf`](docs/analyse_lecture_billet_avion_frontend.pdf) |

## Développement local

Prérequis hôte :

- Node.js 22 ou compatible avec Vite 5.
- pnpm 9.6.0, verrouillé par `packageManager`.
- Docker pour les stacks isolées et E2E.

Commandes principales :

```bash
pnpm install --frozen-lockfile
pnpm run dev
pnpm run check
```

`pnpm run dev` n'ouvre plus directement Vite. Il affiche les entrypoints
disponibles pour éviter de confondre frontend seul et stack complète.

Lancement frontend local seul :

```bash
pnpm run dev:frontend
```

Lancement frontend dans Docker :

```bash
pnpm run dev:docker
```

Lancement stack complète E2E, avec MariaDB + API + frontend :

```bash
E2E_API_DIR=/chemin/vers/chaye_API ./launch
```

Équivalent npm/pnpm :

```bash
E2E_API_DIR=/chemin/vers/chaye_API pnpm run dev:e2e-stack
```

Le lanceur vérifie Docker, tente `sudo systemctl start docker` sur Linux avec systemd si le daemon ne répond pas, puis démarre MariaDB, l’API et le frontend via Docker Compose.

Par défaut, le lancement local insère aussi les données de démonstration riches de l’API : membres, annonces, collaborations, destinataires et discussions. Pour garder uniquement le seed minimal E2E :

```bash
E2E_SEED_PROFILE=minimal E2E_API_DIR=/chemin/vers/chaye_API ./launch
```

L'application locale démarre par défaut sur `http://localhost:5173`.
La configuration frontend est centralisée dans `src/config/env.ts` et validée
avec Zod.

Variables principales :

- `VITE_API_URL`, défaut `http://localhost:3333`
- `VITE_API_ASSETS_URL`, défaut identique à `VITE_API_URL`
- `VITE_PUBLIC_ASSETS_URL`, défaut `/`
- `VITE_APP_ENV`, valeurs `development`, `test`, `production`, `e2e`
- `VITE_E2E`, défaut `false`
- `VITE_USE_API_MOCKS`, défaut `false`

## Docker

```bash
docker compose build frontend-tools
docker compose up --build frontend-dev
docker compose build frontend-production
```

La stack E2E locale démarre MariaDB, l'API, le frontend et Playwright :

```bash
docker compose -f compose.e2e.yml build
docker compose -f compose.e2e.yml run --rm e2e
```

Raccourcis équivalents :

```bash
pnpm run dev:docker
pnpm run e2e:stack
```

Le dépôt API doit être disponible à côté du frontend, ou indiqué avec
`E2E_API_DIR`.

L'image E2E utilise une couche Docker dédiée aux navigateurs Playwright
(`playwright-browsers`) afin de garder Chromium en cache quand seuls les
fichiers source ou les tests changent.

## Structure

- `src/main.tsx` : entrée navigateur.
- `src/app/` : composition applicative, layout et routes lazy-loadées.
- `src/features/` : pages, schémas, tests et logique par capacité métier.
- `src/components/` : composants UI historiques et partagés.
- `src/lib/` : client API centralisé et helpers transverses.
- `src/config/` : validation des variables d'environnement frontend.
- `src/test/` : infrastructure Vitest/MSW.
- `e2e/` : fixtures, pages et scénarios Playwright.
- `docs/` : architecture, qualité, tests et analyses produit/techniques.

Les nouvelles dépendances doivent aller du partagé vers les features, puis vers
`src/app`. Éviter les dépendances directes entre features.

## Validation

```bash
pnpm run lint
pnpm run format:check
pnpm run typecheck
pnpm run test
pnpm run coverage
pnpm run build
pnpm run docs:diagrams
docker build --target production --build-arg VITE_API_URL=http://localhost:3333 -t chaye-web-frontend .
```

`pnpm run check` exécute la chaîne principale hors Docker.
