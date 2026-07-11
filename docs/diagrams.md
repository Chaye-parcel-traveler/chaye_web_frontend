# Diagrammes

Les diagrammes SVG de `docs/diagrams/` sont des artefacts générés. La source de
vérité est le script :

```bash
scripts/generate-doc-diagrams.mjs
```

## Régénération

Depuis la racine du dépôt frontend :

```bash
pnpm run docs:diagrams
```

Le script réécrit :

- `docs/diagrams/applicationStructure.svg`
- `docs/diagrams/database.svg`

Après régénération, exécuter :

```bash
pnpm run format:check
pnpm run typecheck
```

## Quand régénérer

Régénérer les SVG dès qu'un changement modifie une des sources de vérité
suivantes :

- structure applicative : `src/app`, `src/features`, `src/shared`, `src/lib`,
  `src/config`;
- flux de données : client API frontend, endpoints backend, `compose.e2e.yml`,
  MariaDB, MSW ou Playwright;
- organisation CI/Docker : workflows GitHub Actions, Dockerfile, Compose.

## Règle de maintenance

Ne pas modifier directement les SVG à la main sauf correction urgente de rendu.
Dans ce cas, reporter ensuite la même modification dans
`scripts/generate-doc-diagrams.mjs`, puis relancer `pnpm run docs:diagrams`.
