# Architecture Overview

This document is technical and intentionally written in English.

## Runtime

- Framework: React 18.
- Build tool: Create React App.
- Routing: React Router.
- API client: Axios.
- Styling: mixed Bootstrap, MUI, Semantic UI, and local CSS.

## Application Boundaries

- `src/App.js`: route registration and global Axios base URL.
- `src/Components/`: page and UI components.
- `src/Services/`: API service wrappers.
- `src/setAuthToken.js`: token header helper.
- `public/`: static assets.

## Current Risks

- Some components still call `http://localhost:5000`.
- Announcement form payload currently diverges from backend validators.
- Social auth UI is inconsistent across screens.
- There is no Docker Compose hot-reload frontend service yet.

## Agent Rule

Do not add new direct `axios` calls with hardcoded hostnames. Prefer service wrappers or the configured Axios base URL.

