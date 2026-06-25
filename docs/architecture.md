# Architecture Overview

This document is technical and intentionally written in English.

## Runtime

- Framework: React 18.
- Build tool: Vite.
- Routing: React Router.
- API client: Axios.
- Type checking: TypeScript is configured for new `.ts` and `.tsx` files without converting the existing JavaScript surface.
- Styling: mixed Bootstrap, MUI, Semantic UI, and local CSS.

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
- There is no Docker Compose hot-reload frontend service yet.

## Agent Rule

Do not add new direct `axios` calls with hardcoded hostnames. Prefer service wrappers or the configured Axios base URL.
