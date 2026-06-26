# Chaye Frontend Agent Backlog

The complete backlog is maintained in `../chaye_API/docs/backlog.md`.
This file tracks frontend-facing work only.

## Sprint 0 - Agentic Readiness

### AGENT-001 - Add frontend agent documentation

Status: done.

Acceptance criteria:

- Frontend agents know where the source product docs live.
- Frontend-specific launch-blocking UI requirements are listed.
- Current Docker behavior is documented accurately.

### AGENT-002-FE - Add frontend Docker development stack

Status: todo.

Scope:

- Add Docker Compose support for Vite hot reload.
- Expose port `3000`.
- Configure `VITE_API_URL=http://localhost:3333`.
- Avoid breaking the existing production Dockerfile.

Acceptance criteria:

- Frontend development can run through Docker.
- The production Docker build still works.
- API calls use `VITE_API_URL`, not hardcoded localhost URLs.

### AGENT-003-FE - Create frontend code vs spec audit

Status: done.

Scope:

- Audit Sprint 1 frontend gaps.
- Record API integration issues.
- Link to the full API-side audit.

Acceptance criteria:

- Frontend agents can identify launch-blocking UI gaps before editing screens.

### AGENT-004-FE - Define frontend quality gates

Status: done.

Scope:

- Define required frontend validation commands.
- Define Docker production build check.
- Define API integration review checks.
- Define docs-only and failure reporting rules.

Acceptance criteria:

- Agents know exactly which commands to run before handing frontend work back.
- Agents know when Docker build validation is required.

### AGENT-005-FE - Split frontend work into GitHub-ready tickets

Status: done.

Scope:

- Define GitHub label strategy.
- Split Sprint 1 and frontend integration work into small agent tickets.
- Add a `gh` issue creation script.

Acceptance criteria:

- Tickets are documented in `docs/agent-tickets.md`.
- GitHub labels and issues have been created.
- `scripts/create-agent-issues.sh` is retained as an idempotent creation script and supports `DRY_RUN=true`.

### AGENT-006-FE - Add workflow governance files

Status: done.

Scope:

- Add GitHub issue templates and PR template.
- Add CODEOWNERS.
- Add frontend CI for test and build.
- Add Definition of Done.
- Add architecture, API contract, and ADR documentation.

Acceptance criteria:

- New issues and PRs guide contributors through the expected workflow.
- Risky frontend areas require a default code owner review.
- Frontend CI validates test and build on the default branch.

### AGENT-007-FE - Activate frontend branch protection

Status: blocked.

Scope:

- Protect `task/lboi/use_chaye_api_backend` in GitHub.
- Require PR review, CODEOWNERS, resolved conversations, and required checks.

Blocker:

- The current `gh` account has `WRITE`, not `ADMIN`.

Tracking issue:

- https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/13

## Sprint 1 - Launch-Blocking UI

### LEG-001-FE - Legal notices access

Status: todo.

Scope:

- Verify existing legal notice page content.
- Link legal notices from footer.
- Link legal notices from login screen.
- Use pending placeholders for company data not supplied yet.

### LEG-002-FE - CGU checkbox during signup

Status: todo.

Scope:

- Add mandatory CGU checkbox.
- Prevent submit if unchecked.
- Send accepted CGU version to backend.
- Display backend validation errors.
- Decide the source of the current CGU version before implementation: frontend config or public API legal config endpoint.
- Decide how future authenticated reacceptance is triggered: `/me` indicator, dedicated endpoint, or temporary frontend flow.

### LEG-003-FE - Report form

Status: todo.

Scope:

- Add "Signaler" on user profile and announcement pages first.
- Add reusable report modal/form.
- Submit to backend report endpoint.

### LEG-004-FE - Admin moderation screen

Status: todo.

Scope:

- Add admin-only moderation page after backend endpoints exist.
- Show filters and report SLA state.
- Add actions for dismiss, warn, suspend.

### LEG-005-FE - Suspended account state

Status: todo.

Scope:

- Display suspended or banned account status.
- Hide or disable publish, book, and message actions.
- Surface backend authorization errors.

### LEG-006-FE - Birth date and minor blocking

Status: todo.

Scope:

- Add birth date to signup.
- Detect minor users client-side for UX.
- Disable publish and booking buttons for minors.
- Show required legal message.
