# Chaye Web Frontend - Agent Guide

This file is the entry point for AI agents working on the web frontend.

## Project Shape

- Runtime: React 18 with Vite.
- App entry: `src/App.jsx`.
- Components: `src/Components/`.
- API services: `src/Services/`.
- Shared auth token helper: `src/setAuthToken.js`.
- Public assets: `public/`.
- Frontend agent docs: `docs/`.

## Sources Of Truth

The transverse product and organization documentation now lives in French in:

- `../chaye_documentations/README.md`
- `../chaye_documentations/produit/`
- `../chaye_documentations/conformite/`
- `../chaye_documentations/processus/`
- `../chaye_documentations/contrats/`
- `../chaye_documentations/sources-pdf/`

Use `../chaye_documentations` for product rules, compliance rules, team workflow, onboarding, and cross-repo decisions.

Use the API OpenAPI specification for public HTTP contracts:

- `../chaye_API/docs/openapi/openapi.yaml`

Keep only executable frontend technical knowledge in this repository:

- `docs/architecture.md`
- `docs/quality-gates.md`
- `docs/adr/0002-api-client-policy.md`

GitHub Issues are the source of truth for backlog, status, dependencies, and implementation traceability.

Do not recreate local backlog, ticket, traceability, code-vs-spec, product specification, or manual API contract files.

When sources disagree, stop and update the owning source before coding:

- functional or cross-repository decision: `../chaye_documentations`;
- public HTTP contract: API OpenAPI;
- implementation status: GitHub Issue;
- frontend architecture or validation command: frontend technical docs.

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
- `scripts/create-agent-issues.sh` checks existing ticket IDs before creation and supports `DRY_RUN=true`.
- Still review existing issues before bulk creation.
- Use `scripts/update-agent-issues-french.sh` only to resynchronize existing issue titles/bodies with the French ticket policy.

## Required Workflow

1. Read the GitHub Issue with `gh issue view`.
2. Read the relevant functional decision in `../chaye_documentations`.
3. Check API OpenAPI when the issue uses a backend contract.
4. Keep UI changes narrow and aligned with existing routes/components.
5. Do not invent legal company data, payment behavior, KYC provider details, or final branding assets.
6. Report implementation status in the GitHub Issue or PR, not in a local Markdown tracker.
7. Run local quality gates through Docker Compose.
8. Open a PR using `.github/pull_request_template.md`.

## Documentation Policy

A feature PR should contain code, tests, and UI screenshots when relevant.

Do not modify Markdown by default in a feature PR. If more than one Markdown file changes, justify each file in the PR.

Use separate PRs for:

- `docs-sync`: functional or cross-repository documentation in `../chaye_documentations`;
- `OPS`: `AGENTS.md`, quality gates, GitHub templates, CI, scripts, and workflow rules.

Do not add a frontend Markdown copy of information already owned by GitHub Issues, OpenAPI, or `../chaye_documentations`.

## Quality Gates

Docker Compose is the required local development and validation runtime for this project. Do not install or run Node.js directly on the host.

```bash
docker compose run --rm frontend-tools npm ci
docker compose run --rm frontend-tools npm run check
```

Then validate the production image:

```bash
docker compose build frontend-production
```

GitHub Actions uses Node.js 24 through `actions/setup-node` and runs each quality gate directly. Docker Compose is for local execution; it is not used inside CI.

See `docs/quality-gates.md` for the complete validation matrix and reporting rules.

## Frontend Rules

- Do not rely on disabled buttons alone for legal or security controls. Backend must enforce transaction blocking.
- Legal notices, CGU checkbox, report buttons, suspension messaging, and minor transaction blocking are launch-blocking UI concerns.
- Keep form field names aligned with backend validators.
- Prefer existing component structure unless a targeted refactor is needed.
- Avoid large styling rewrites while implementing compliance features.
- Use `VITE_API_URL` for API calls. Existing hardcoded `http://localhost:5000` calls are legacy debt and should not be copied.
