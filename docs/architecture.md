# Architecture Overview

This document is technical and intentionally written in English.

## Runtime

- Framework: React 18.
- Language: TypeScript 6.
- Runtime: Node.js 24.
- Build tool: Vite 8.
- Routing: React Router.
- API client: Axios.
- Type checking: strict TypeScript covers the complete application source.
- Styling: mixed Bootstrap, MUI, Semantic UI, and local CSS.
- Local execution: Docker Compose for development, dependencies, quality gates, and production image builds.
- CI execution: GitHub Actions with Node.js 24.

## Application Boundaries

- `src/main.tsx`: browser entrypoint.
- `src/app/`: application composition, providers, route registration, layouts, canonical URLs, and legacy redirects.
- `src/features/`: business capabilities with colocated pages, components, API modules, types, and component styles.
- `src/components/`: UI components shared across features.
- `src/lib/api-client.ts`: shared Axios client, auth token header handling, API URL helpers, and normalized API errors.
- `src/styles/`: styles that are genuinely shared across features.
- `src/types/`: shared TypeScript API infrastructure contracts only.
- `public/`: static assets.
- `index.html`: Vite HTML entrypoint.

Dependencies should flow from shared modules to features and then to `app`.
Feature-to-feature imports are limited to existing screen composition; new
cross-feature dependencies should be composed from `app`.

Canonical frontend URLs use English, lowercase path segments. Historical URLs
remain registered only as compatibility redirects in `src/app/router.tsx`.

## Current Risks

- Social auth UI is inconsistent across screens.

## Agent Rule

All new application source and test files must use `.ts` or `.tsx`. ESLint rejects `.js` and `.jsx` files under `src/`.

Do not add new direct `axios` calls with hardcoded hostnames. Prefer service wrappers or the configured Axios base URL.
