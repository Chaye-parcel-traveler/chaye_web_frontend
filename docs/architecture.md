# Architecture Overview

This document is technical and intentionally written in English.

## Runtime

- Framework: React 18.
- Runtime: Node.js 24.
- Build tool: Vite 8.
- Routing: React Router.
- API client: Axios.
- Type checking: TypeScript is configured for new `.ts` and `.tsx` files without converting the existing JavaScript surface.
- Styling: mixed Bootstrap, MUI, Semantic UI, and local CSS.
- Local execution: Docker Compose for development, dependencies, quality gates, and production image builds.
- CI execution: GitHub Actions with Node.js 24.

## Application Boundaries

- `src/App.js`: route registration.
- `src/lib/api.js`: shared Axios client, auth token header handling, API URL helpers, and normalized API errors.
- `src/types/`: shared TypeScript contracts for API responses and core entities.
- `src/Components/`: page and UI components.
- `src/Services/`: API service wrappers.
- `src/setAuthToken.js`: token header helper.
- `public/`: static assets.
- `index.html`: Vite HTML entrypoint.

## Current Risks

- Social auth UI is inconsistent across screens.
- Existing React source still uses JSX in `.js` files and requires the compatibility transform in `vite.config.ts`.

## Agent Rule

Do not add new direct `axios` calls with hardcoded hostnames. Prefer service wrappers or the configured Axios base URL.
