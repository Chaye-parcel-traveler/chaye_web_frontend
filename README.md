# Chaye Web Frontend - Guide d'arrivee pour nouveau dev

Bienvenue dans le frontend Chaye.

Ce README sert a aider un nouveau dev a installer le projet, comprendre le workflow GitHub et contribuer sans se perdre dans tout le code existant.

La documentation produit transverse vit en francais dans `../chaye_documentations`.

Les details techniques propres au frontend restent dans `AGENTS.md` et dans `docs/`.

## Vue Simple

Ce repo contient l'application web React.

Elle sert a:

- afficher les pages vues par les utilisateurs;
- appeler l'API Chaye;
- gerer les formulaires;
- afficher les parcours comme inscription, profil, annonces et support.

```mermaid
flowchart LR
    User["Utilisateur"] --> Browser["Navigateur"]
    Browser --> React["Frontend React<br/>Vite"]
    React --> API["API Chaye<br/>http://localhost:3333"]
    API --> DB["MariaDB"]
```

## Installation Locale

### Prerequis

Installe d'abord:

- Docker Desktop;
- Git;
- GitHub CLI: `gh`;
- un editeur de code.

Node.js et npm ne sont pas requis sur la machine locale. Le frontend utilise Node.js 24 dans Docker Compose.

Verifie:

```bash
docker --version
gh auth status
```

## Demarrer Le Produit En Local

Le produit complet utilise deux repos:

- `chaye_API` pour le backend;
- `chaye_web_frontend` pour l'interface web.

Pour travailler confortablement, demarre d'abord l'API avec Docker, puis le frontend.

```mermaid
sequenceDiagram
    participant Dev as Dev
    participant API as API Docker
    participant FE as Frontend React
    participant Browser as Navigateur

    Dev->>API: docker compose up -d --build
    API-->>Dev: API prete sur localhost:3333
    Dev->>FE: docker compose up --build frontend-dev
    FE-->>Browser: app prete sur localhost:3000
    Browser->>FE: ouvre l'application
    FE->>API: appels HTTP via Axios
```

### 1. Demarrer L'API

Depuis le dossier API:

```bash
cd ../chaye_API
docker compose up -d --build
docker compose logs -f api
```

API attendue:

```text
http://localhost:3333
```

### 2. Installer Le Frontend

Depuis ce dossier:

```bash
cd ../chaye_web_frontend
docker compose build frontend-tools
docker compose run --rm frontend-tools npm ci
```

### 3. Demarrer Le Frontend

```bash
docker compose up --build frontend-dev
```

Application attendue:

```text
http://localhost:3000
```

## Docker Cote Frontend

Docker Compose est l'interface locale obligatoire pour le developpement, les tests et les builds. Le service `frontend-dev` fournit le hot reload. Le service `frontend-tools` execute les commandes npm dans Node.js 24 sans installer Node.js sur l'hote.

Commandes principales:

```bash
docker compose up --build frontend-dev
docker compose run --rm frontend-tools npm run lint
docker compose run --rm frontend-tools npm run typecheck
docker compose run --rm frontend-tools npm test -- --watchAll=false
docker compose run --rm frontend-tools npm run build
docker compose run --rm frontend-tools npm run check
```

Pour verifier l'image de production:

```bash
docker compose build frontend-production
docker compose up frontend-production
```

```mermaid
flowchart TB
    DockerCompose["Docker Compose local"] --> DevMode["frontend-dev<br/>hot reload"]
    DockerCompose --> Tools["frontend-tools<br/>lint, test, typecheck, build"]
    DockerCompose --> ProdCheck["frontend-production"]
    ProdCheck --> Nginx["Image nginx statique"]
```

## Comprendre Le Repo

```mermaid
flowchart TB
    App["src/App.jsx<br/>Routes principales"] --> Components["src/Components<br/>Pages et blocs UI"]
    Components --> Services["src/Services<br/>Appels API reutilisables"]
    Components --> Assets["public<br/>Images et fichiers publics"]
    App --> Auth["src/setAuthToken.js<br/>Token auth Axios"]
    Tests["src/*.test.jsx<br/>Tests React"] --> App
```

Lecture conseillee avant de coder:

1. `../chaye_documentations/README.md`
2. `../chaye_documentations/produit/README.md`
3. `../chaye_documentations/processus/README.md`
4. `../chaye_documentations/sources-pdf/README.md`
5. `AGENTS.md`
6. `docs/architecture.md`
7. `docs/quality-gates.md`
8. l'issue GitHub sur laquelle tu travailles

La specification produit transverse vit dans `../chaye_documentations`. Les contrats HTTP publics vivent dans `../chaye_API/docs/openapi/openapi.yaml`. Le statut du travail vit dans GitHub Issues.

## Workflow Avec Les Issues GitHub

Une issue GitHub est une petite mission. Elle explique quoi faire et comment savoir que c'est fini.

```mermaid
flowchart LR
    Ready["Issue agent:ready"] --> Understand["Lire et comprendre"]
    Understand --> Branch["Creer une branche"]
    Branch --> Code["Coder petit"]
    Code --> Test["Tester"]
    Test --> PR["Ouvrir une PR"]
    PR --> Review["Review"]
    Review --> Merge["Merge"]
```

### 1. Trouver Une Issue

```bash
gh issue list --repo Chaye-parcel-traveler/chaye_web_frontend --label agent:ready
```

Lis l'issue comme un contrat:

- objectif;
- contexte;
- criteres d'acceptation;
- labels;
- dependances API eventuelles.

Si l'issue contient `blocked:backend-contract`, cela veut dire que le frontend depend d'un contrat API pas encore pret ou pas encore stabilise.

### 2. Creer Une Branche

```bash
git checkout -b issue-12-short-description
```

Exemple:

```bash
git checkout -b issue-8-cgu-checkbox
```

### 3. Coder En Gardant Le Changement Petit

Evite de melanger:

- une nouvelle fonctionnalite;
- une refonte CSS;
- un renommage massif;
- une correction technique non liee.

Si tu decouvres un autre probleme, cree ou commente une autre issue.

### 4. Lancer Les Verifications

Avant de demander une review:

```bash
docker compose run --rm frontend-tools npm ci
docker compose run --rm frontend-tools npm run check
docker compose build frontend-production
```

En local, n'execute pas les commandes `npm` directement sur l'hote. Utilise toujours le service `frontend-tools`.

Si tu touches l'integration API, demarre aussi le backend Docker et teste le parcours dans le navigateur.

### 5. Ouvrir Une Pull Request

```bash
gh pr create --repo Chaye-parcel-traveler/chaye_web_frontend
```

Dans la PR:

- resume le changement en francais;
- garde les termes techniques en anglais;
- lie l'issue avec `Closes #numero` si la PR termine vraiment l'issue;
- indique les commandes lancees.

## Regles De Langue

```mermaid
flowchart TB
    FR["Francais"] --> FR1["Issues GitHub"]
    FR --> FR2["Criteres d'acceptation"]
    FR --> FR3["Specification fonctionnelle"]
    FR --> FR4["Descriptions de PR"]

    EN["Anglais"] --> EN1["Code"]
    EN --> EN2["Variables"]
    EN --> EN3["Composants"]
    EN --> EN4["Endpoints"]
    EN --> EN5["Spec technique"]
```

Exemple correct:

```text
Ajouter une case CGU obligatoire avant l'appel `POST /members`.
```

## Niveaux De Seniorite

Le workflow est le meme pour tout le monde. Ce qui change, c'est le niveau d'autonomie.

```mermaid
flowchart TB
    Junior["Junior"] --> J1["Prend des issues tres cadrees"]
    Junior --> J2["Suit les composants existants"]
    Junior --> J3["Demande validation en cas de doute"]

    Mid["Intermediaire"] --> M1["Propose le decoupage"]
    Mid --> M2["Repere les dependances API"]
    Mid --> M3["Ajoute tests et docs utiles"]

    Senior["Senior"] --> S1["Valide architecture et risques"]
    Senior --> S2["Evite les grosses PRs floues"]
    Senior --> S3["Aide a proteger la coherence produit"]
```

Pour un nouveau dev, le bon reflexe est:

1. partir d'une issue;
2. chercher un composant similaire;
3. copier le style du code existant;
4. faire petit;
5. verifier;
6. demander review.

## API Et Appels Reseau

Le frontend doit utiliser:

```js
import.meta.env.VITE_API_URL
```

En local:

```bash
VITE_API_URL=http://localhost:3333 docker compose up --build frontend-dev
```

Attention: certains anciens composants utilisent encore `http://localhost:5000` directement. Ne copie pas ce pattern. Quand tu touches ces fichiers, migre vers la configuration Axios base URL.

```mermaid
flowchart TD
    Component["Composant React"] --> Service["Service API ou Axios"]
    Service --> BaseURL["VITE_API_URL"]
    BaseURL --> Backend["API Chaye"]
    Bad["URL hardcodee localhost:5000"] --> Avoid["A eviter"]
```

## Definition De Fini

Une issue frontend est vraiment finie quand:

- les criteres d'acceptation sont couverts;
- l'UI reste coherent avec l'existant;
- les appels API utilisent le bon contrat;
- `docker compose run --rm frontend-tools npm run check` passe;
- `docker compose build frontend-production` passe;
- la PR explique clairement ce qui a ete fait.

```mermaid
flowchart LR
    Criteria["Criteres OK"] --> Tests["Tests OK"]
    Tests --> Build["Build OK"]
    Build --> Docs["Docs mises a jour si besoin"]
    Docs --> Review["Pret pour review"]
```

## Ou Chercher L'Information

```mermaid
flowchart LR
    Need["J'ai une question"] --> Product{"Question produit ?"}
    Product -- Oui --> Spec["../chaye_documentations"]
    Product -- Non --> Front{"Question frontend ?"}
    Front -- Oui --> Docs["AGENTS.md<br/>architecture.md<br/>quality-gates.md"]
    Front -- Non --> Contract{"Contrat HTTP ?"}
    Contract -- Oui --> OpenAPI["API OpenAPI"]
    Contract -- Non --> Issue["GitHub Issue<br/>discussion PR"]
```

Ne crée pas une copie locale d'une information déjà portée par GitHub Issues, OpenAPI ou `../chaye_documentations`. Les PRs feature ne modifient pas les Markdown par défaut; les changements de workflow passent par une PR `OPS`.
