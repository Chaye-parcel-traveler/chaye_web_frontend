---
name: implement-frontend-change
description: Implement and verify changes to the Chaye React frontend. Use for components, pages, routes, forms, API integration, TypeScript types, styles, accessibility, tests, Docker, Vite, build configuration, bug fixes, or refactors in chaye_web_frontend.
---

# Implement Frontend Change

1. Use the user request or linked GitHub issue as the scope. Inspect the current
   feature, shared modules, route, and adjacent tests before editing.
2. Keep shared infrastructure in `src/lib` or `src/components`, business code
   in its `src/features` folder, and composition in `src/app`.
3. Apply conditional rules:
   - API integration: inspect only the relevant OpenAPI path, use
     `src/lib/api-client.ts`, and keep payload names aligned.
   - Compliance UI: read only the precise decision in
     `../chaye_documentations/`; keep backend enforcement independent.
   - Visual change: preserve existing design patterns and capture the resulting
     UI when practical.
   - Dependency or Docker change: update lockfiles and validate the production
     image.
4. Add focused tests for behavior, routing, API state, validation, and
   accessibility cases that apply.
5. Run:

   ```bash
   docker compose run --rm frontend-tools npm ci
   docker compose run --rm frontend-tools npm run check
   docker compose build frontend-production
   ```

6. Report behavior, screenshots when relevant, validation, and unresolved
   backend or product dependencies.
