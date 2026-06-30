# Chaye Web Frontend - Agent Guide

Keep this file small. It contains only rules that apply to every frontend task.

## Scope And Sources

- Treat the user request or linked GitHub issue as the task scope.
- Inspect current code and adjacent tests before consulting documentation.
- Do not bulk-read `../chaye_documentations/` or the API specification.
- Read only the precise product decision or OpenAPI path selected by the task.
- GitHub Issues and PRs own backlog, dependencies, and implementation status.

## Project Invariants

- Use TypeScript `.ts` and `.tsx` for application and test code.
- Keep app composition in `src/app/`, business capabilities in `src/features/`,
  shared UI in `src/components/`, and shared infrastructure in `src/lib/`.
- Prefer shared modules → features → app dependency flow. Avoid new
  feature-to-feature dependencies.
- Use `src/lib/api-client.ts` and `VITE_API_URL` for API calls. Never hardcode an
  API host.
- Match public payloads and responses to the relevant API OpenAPI path.
- Do not rely on disabled UI controls for security, legal, or transactional
  enforcement; the backend must enforce those rules.
- Add or update focused tests for every behavior change.
- Do not invent legal company data, payment behavior, KYC providers, or final
  branding assets.
- Feature PRs do not modify Markdown unless the task explicitly requires it.

## Conditional Workflows

- `$implement-frontend-change`: React, routing, API integration, forms, tests,
  styles, accessibility, Docker, or build changes.
- `$manage-frontend-delivery`: GitHub issues, pull requests, documentation
  ownership, workflow, or repository settings.

## Validation

Run locally through Docker Compose:

```bash
docker compose run --rm frontend-tools npm ci
docker compose run --rm frontend-tools npm run check
docker compose build frontend-production
```

Do not run host npm commands as a fallback. Report Docker infrastructure
failures and the closest useful validation completed.
