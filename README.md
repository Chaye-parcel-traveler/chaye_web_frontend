# Chaye Web Frontend

Application web Chaye basée sur React 19, TypeScript, Vite et Axios.

## Sources de vérité

| Sujet                              | Source                                                                                    |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| Périmètre et statut du travail     | [GitHub Issues](https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues) et PR |
| Comportement réellement implémenté | Code et tests                                                                             |
| Contrat HTTP public                | `../chaye_API/docs/openapi/openapi.yaml`                                                  |
| Produit et conformité transverses  | `../chaye_documentations/`                                                                |
| Commandes et runtime frontend      | `package.json`, `compose.yml` et CI                                                       |

## Développement local

Prérequis : Docker Desktop, Git et GitHub CLI `gh`. Node.js et npm ne sont pas
requis sur l'hôte.

Depuis `chaye_web_frontend/` :

```bash
docker compose build frontend-tools
docker compose run --rm frontend-tools npm ci
docker compose up --build frontend-dev
```

L'application est disponible sur `http://localhost:3000`. L'API attendue par
défaut est `http://localhost:3333`.

Commandes principales :

```bash
docker compose run --rm frontend-tools npm run check
docker compose build frontend-production
docker compose up frontend-production
```

`npm run check` exécute lint, format check, typecheck, tests et build. Les
commandes npm locales doivent passer par `frontend-tools`.

## Tests E2E locaux

Prérequis : les dépôts `chaye_web_frontend` et `chaye_API` sont placés dans le
même répertoire parent. La stack utilise Chromium, l'API AdonisJS et une
MariaDB éphémère indépendante de la base de développement.

Construire les images lors de la première exécution ou après un changement de
dépendances :

```bash
docker compose -f compose.e2e.yml build
```

Lancer les tests headless :

```bash
docker compose -f compose.e2e.yml run --rm e2e
```

Chaque lancement remet le schéma à zéro, applique les migrations et le seed,
puis arrête l'API et MariaDB lorsque Playwright termine. Deux lancements
consécutifs ne réutilisent donc pas les données du précédent.

La base est exposée sur `127.0.0.1:3307`, l'API sur
`http://127.0.0.1:3333` et le navigateur utilise les noms de services Docker.
Le chemin du dépôt API peut être remplacé avec `E2E_API_DIR`.

Compose conserve les conteneurs arrêtés afin de pouvoir les relancer. Pour
supprimer également ces conteneurs, le réseau et les données temporaires :

```bash
docker compose -f compose.e2e.yml down --volumes
```

En cas d'échec, les traces, screenshots et vidéos sont conservés dans
`test-results/`. Le rapport HTML est écrit dans `playwright-report/`. Les
scripts `e2e:ui` et `e2e:headed` existent, mais leur exécution graphique dans
Docker n'est pas garantie.

## Structure

- `src/main.tsx` : entrée navigateur.
- `src/app/` : providers, layouts et routes.
- `src/features/` : pages, composants, API et types par capacité métier.
- `src/components/` : composants UI partagés.
- `src/lib/api-client.ts` : client Axios, authentification et erreurs API.
- `src/styles/` : styles réellement partagés.
- `src/test/` : infrastructure et mocks de tests.
- `public/` : assets statiques.

Les dépendances vont des modules partagés vers les features, puis vers `app`.
Les nouvelles dépendances directes entre features sont à éviter.

## Contribution

1. Partir d'une issue GitHub avec un périmètre et des critères vérifiables.
2. Créer une branche dédiée.
3. Modifier ensemble le comportement et ses tests.
4. Vérifier le chemin OpenAPI concerné lorsqu'un contrat backend est utilisé.
5. Exécuter les commandes de validation Docker ci-dessus.
6. Ajouter des captures d'écran lorsque l'UI change visuellement.
7. Ouvrir une PR avec `.github/pull_request_template.md`.

Les besoins fonctionnels, critères d'acceptation et résumés de PR sont en
français. Le code, les identifiants, endpoints, commandes et labels techniques
restent en anglais.

## Utilisation avec Codex

Ouvrir Codex depuis la racine `chaye_web_frontend` afin de charger `AGENTS.md`
et de découvrir les skills repo-scoped sous `.agents/skills/`.

Partir de la demande ou de l'issue, du code concerné et du skill correspondant.
Ne pas recréer localement une règle déjà détenue par GitHub, OpenAPI ou
`chaye_documentations`.
