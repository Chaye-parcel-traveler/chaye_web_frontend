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

- `src/App.tsx`: route registration.
- `src/lib/api.ts`: shared Axios client, auth token header handling, API URL helpers, and normalized API errors.
- `src/types/`: shared TypeScript contracts for API responses and core entities.
- `src/Components/`: page and UI components.
- `src/Services/`: API service wrappers.
- `src/setAuthToken.ts`: token header helper.
- `public/`: static assets.
- `index.html`: Vite HTML entrypoint.

## Current Risks

- Social auth UI is inconsistent across screens.

## Agent Rule

All new application source and test files must use `.ts` or `.tsx`. ESLint rejects `.js` and `.jsx` files under `src/`.

Do not add new direct `axios` calls with hardcoded hostnames. Prefer service wrappers or the configured Axios base URL.
