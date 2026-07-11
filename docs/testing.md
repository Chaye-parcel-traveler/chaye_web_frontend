# Tests

## Niveaux

| Niveau     | Outil          | Emplacement        | But                                                 |
| ---------- | -------------- | ------------------ | --------------------------------------------------- |
| Unitaires  | Vitest         | `src/**/*.test.ts` | Valider fonctions, schémas et helpers               |
| API mockée | Vitest + MSW   | `src/**/*.test.ts` | Valider payloads, erreurs et auth sans backend réel |
| E2E        | Playwright     | `e2e/specs`        | Valider les parcours dans un navigateur             |
| E2E stack  | Docker Compose | `compose.e2e.yml`  | Lancer frontend + API + MariaDB                     |

La stack complète est détaillée dans [`docs/e2e.md`](e2e.md).

## Commandes

```bash
pnpm run test
pnpm run coverage
pnpm run e2e
pnpm run e2e:stack
docker compose -f compose.e2e.yml run --rm e2e
```

Pour les ports déjà occupés en local :

```bash
E2E_DB_PORT=33307 E2E_API_PORT=33333 E2E_FRONTEND_PORT=33000 docker compose -f compose.e2e.yml run --rm e2e
```

## Organisation Playwright

- `e2e/fixtures` : données de test.
- `e2e/pages` : objets page orientés utilisateur.
- `e2e/support` : helpers API et génération de données.
- `e2e/specs` : scénarios.

Les tests E2E qui ont besoin d'un utilisateur doivent créer leurs données via
l'API afin d'éviter de dépendre d'un état local existant.

Le workflow manuel GitHub Actions exécute aussi `compose.e2e.yml` et publie le
rapport Playwright uniquement en cas d'échec.

## MSW

Le serveur MSW est configuré dans `src/test/mocks/server.ts` et initialisé par
`src/test/setup.ts`. Les tests doivent déclarer leurs handlers localement avec
`server.use(...)` pour garder chaque cas isolé.
