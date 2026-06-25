# Chaye Frontend Traceability

The complete product traceability matrix is maintained in `../chaye_API/docs/traceability.md`.
This file tracks frontend implementation state.

Status values:

- `not started`
- `partial`
- `implemented`
- `blocked`
- `not in scope`

| ID | Frontend requirement | Current state | Target files or areas | Status |
| --- | --- | --- | --- | --- |
| LEG-001-FE | Legal notices accessible from footer and login screen. | Legal page components exist; links and V3.1 content need review. | `src/Components/Footer/`, `src/Components/Member/Login.js`, legal page components. | partial |
| LEG-002-FE | Mandatory CGU checkbox during signup. | Signup exists; CGU acceptance flow not confirmed. | `src/Components/Member/SignUp.js`, auth/member service calls. | not started |
| LEG-003-FE | Report action and form. | No report UI confirmed. | Profile, announcements, future trip/message screens. | not started |
| LEG-004-FE | Admin moderation back-office. | No admin moderation UI confirmed. | New or existing admin route/component. | not started |
| LEG-005-FE | Suspended account state and disabled transactional actions. | No member status UI confirmed. | Profile, announcement creation, booking, messaging. | not started |
| LEG-006-FE | Birth date registration and minor transaction blocking. | Birth date field not confirmed. | Signup, announcement creation, booking flow. | not started |
| OPS-001-FE | Frontend agent docs. | Added in this documentation layer. | `AGENTS.md`, `docs/`. | implemented |
| OPS-002-FE | Docker development documentation. | Dockerfile exists for production build; no frontend compose dev service exists. | `Dockerfile`, future compose service, `REACT_APP_API_URL`. | partial |
| OPS-003-FE | Frontend code vs spec audit. | Added `docs/code-vs-spec.md`; full audit lives in API docs. | Keep updated when frontend contracts change. | implemented |
| OPS-004-FE | Frontend quality gates. | Added `docs/quality-gates.md` with test/build, Docker build check, API integration checks, and failure reporting. | Add lint and CI later. | implemented |
| OPS-005-FE | GitHub-ready agent tickets. | Added `docs/agent-tickets.md` and `scripts/create-agent-issues.sh`; created frontend issues #1-#12 on GitHub. | Do not rerun script without checking for duplicates. | implemented |
| OPS-006-FE | Workflow governance. | Added issue templates, PR template, CODEOWNERS, frontend CI, Definition of Done, architecture/API docs, and ADRs. | Replace default CODEOWNER with real GitHub teams when available. | implemented |
| OPS-007-FE | GitHub branch protection. | Could not apply branch protection because the `gh` account has `WRITE`, not `ADMIN`; created issue #13 and documented required settings. | A GitHub admin must activate branch protection on `task/lboi/use_chaye_api_backend`. | blocked |
