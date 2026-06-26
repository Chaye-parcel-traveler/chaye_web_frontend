# Chaye Web Frontend - Agent Guide

This file is the entry point for AI agents working on the web frontend.

## Project Shape

- Runtime: React 18 with Vite.
- App entry: `src/App.js`.
- Components: `src/Components/`.
- API services: `src/Services/`.
- Shared auth token helper: `src/setAuthToken.js`.
- Public assets: `public/`.
- Frontend agent docs: `docs/`.

## Product Source Of Truth

The transverse product and organization documentation now lives in French in:

- `../chaye_documentations/README.md`
- `../chaye_documentations/produit/`
- `../chaye_documentations/conformite/`
- `../chaye_documentations/processus/`
- `../chaye_documentations/contrats/`
- `../chaye_documentations/sources-pdf/`

Use `../chaye_documentations` for product rules, compliance rules, team workflow, onboarding, and cross-repo decisions.

The API repo remains useful for backend-specific technical details:

- `../chaye_API/docs/spec-v3.1.md`
- `../chaye_API/docs/backlog.md`
- `../chaye_API/docs/traceability.md`

Frontend-specific notes live in this repo:

- `docs/spec-v3.1.md`
- `docs/backlog.md`
- `docs/traceability.md`
- `docs/docker-development.md`
- `docs/code-vs-spec.md`
- `docs/quality-gates.md`
- `docs/agent-tickets.md`
- `docs/definition-of-done.md`
- `docs/architecture.md`
- `docs/api-contracts.md`
- `docs/adr/`
- `docs/github-governance.md`

When `../chaye_documentations`, API docs, and frontend docs disagree, stop and update `../chaye_documentations` from the latest validated product decision before coding. Then update frontend docs only for frontend-specific details.

## Language Policy

- GitHub issue titles, issue bodies, business rules, acceptance criteria, and functional specifications must be written in French.
- Code, identifiers, field names, endpoints, commands, labels used for automation, and technical specifications must be written in English.
- Keep technical tokens unchanged inside French text, for example `VITE_API_URL`, `departingFrom`, `npm run build`, or `agent:ready`.
- The `../chaye_documentations` repo lives in French. Always add an explanatory note when creating a new structural document there.

## GitHub Issues Policy

- Use GitHub Issues as the shared backlog for team and agent work.
- Use `gh` for issue management when network/auth access is available.
- Before creating an issue, run `gh issue list --repo Chaye-parcel-traveler/chaye_web_frontend --state all --limit 100 --json number,title` and check for duplicates.
- Issue titles and bodies must be written in French, while technical tokens stay in English.
- Keep labels in English because they are used for filtering and automation, for example `agent:ready`, `area:frontend`, `blocked:backend-contract`.
- Scope issues by verifiable product/UI capability, not by file, component, command, or isolated technical step.
- Prefer `size:M` for agent-ready implementation work. Use `agent:too-small`, `agent:too-large`, or `agent:needs-scope` when an issue needs reshaping before implementation.
- Every implementation issue should state included scope, excluded scope when useful, acceptance criteria, likely files, quality gates, risks, and dependencies.
- Link issue work back to `docs/agent-tickets.md` when the ticket already exists there.
- `scripts/create-agent-issues.sh` checks existing ticket IDs before creation and supports `DRY_RUN=true`.
- Still review existing issues before bulk creation.
- Use `scripts/update-agent-issues-french.sh` only to resynchronize existing issue titles/bodies with the French ticket policy.

## Required Workflow

1. Find the related requirement ID in `../chaye_API/docs/traceability.md`.
2. Check the frontend-specific notes in `docs/`.
3. Keep UI changes narrow and aligned with existing routes/components.
4. Do not invent legal company data, payment behavior, KYC provider details, or final branding assets.
5. Update `docs/traceability.md` if frontend implementation state changes.
6. Run the quality gates below.
7. Open a PR using `.github/pull_request_template.md`.

## Quality Gates

Docker is the required first validation runtime for this project.

The current Dockerfile is for production image builds, not local hot-reload development. Until a frontend Docker Compose service exists, run frontend checks in a one-shot Node container before any host fallback:

```bash
docker run --rm \
  -v "$PWD":/app \
  -v chaye_web_frontend_node_modules:/app/node_modules \
  -w /app \
  -e VITE_API_URL=http://host.docker.internal:3333 \
  node:20-alpine \
  sh -lc "npm ci && npm run lint && npm test -- --watchAll=false && npm run typecheck && npm run build"
```

Then run the Docker production build check:

```bash
docker build --build-arg VITE_API_URL=http://localhost:3333 -t chaye-web-frontend .
```

Do not run host `npm` commands first. Host commands are a last-resort fallback only when Docker is unavailable or broken for infrastructure reasons. If a fallback is used, document why Docker could not be used and run only the closest useful subset.

See `docs/quality-gates.md` for the complete validation matrix and reporting rules.
See `docs/docker-development.md` before changing API URL handling or Docker behavior.

## Frontend Rules

- Do not rely on disabled buttons alone for legal or security controls. Backend must enforce transaction blocking.
- Legal notices, CGU checkbox, report buttons, suspension messaging, and minor transaction blocking are launch-blocking UI concerns.
- Keep form field names aligned with backend validators.
- Prefer existing component structure unless a targeted refactor is needed.
- Avoid large styling rewrites while implementing compliance features.
- Use `VITE_API_URL` for API calls. Existing hardcoded `http://localhost:5000` calls are legacy debt and should not be copied.
