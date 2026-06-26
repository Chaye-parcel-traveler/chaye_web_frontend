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
| LEG-002-FE | Mandatory CGU checkbox during signup. | Signup forms currently call `POST /members` without `acceptedCguVersion`; API integration will fail until the field is sent. Source of current CGU version and future reacceptance trigger remain product decisions. | `src/Components/Member/SignUp.js`, `src/Components/Member/LoginSignup.js`, auth/member service calls, CGU version config or legal config endpoint. | not started |
| LEG-003-FE | Report action and form. | No report UI confirmed. | Profile, announcements, future trip/message screens. | not started |
| LEG-004-FE | Admin moderation back-office. | No admin moderation UI confirmed. | New or existing admin route/component. | not started |
| LEG-005-FE | Suspended account state and disabled transactional actions. | No member status UI confirmed. | Profile, announcement creation, booking, messaging. | not started |
| LEG-006-FE | Birth date registration and minor transaction blocking. | Birth date field not confirmed. | Signup, announcement creation, booking flow. | not started |
| OPS-001-FE | Frontend agent docs. | Added in this documentation layer. | `AGENTS.md`, `docs/`. | implemented |
| OPS-002-FE | Docker development documentation. | Dockerfile exists for production build; no frontend compose dev service exists. | `Dockerfile`, future compose service, `VITE_API_URL`. | partial |
| OPS-003-FE | Frontend code vs spec audit. | Added `docs/code-vs-spec.md`; full audit lives in API docs. | Keep updated when frontend contracts change. | implemented |
| OPS-004-FE | Frontend quality gates. | Added `docs/quality-gates.md` with lint/test/build, Docker build check, API integration checks, and failure reporting. | Keep lint/test/build aligned with CI. | implemented |
| OPS-005-FE | GitHub-ready agent tickets. | Added `docs/agent-tickets.md` and `scripts/create-agent-issues.sh`; created frontend issues #1-#12 on GitHub. | Do not rerun script without checking for duplicates. | implemented |
| OPS-006-FE | Workflow governance. | Added issue templates, PR template, CODEOWNERS, frontend CI with lint/test/build, Definition of Done, architecture/API docs, and ADRs. | Replace default CODEOWNER with real GitHub teams when available. | implemented |
| OPS-007-FE | GitHub branch protection. | Could not apply branch protection because the `gh` account has `WRITE`, not `ADMIN`; created issue #13 and documented required settings. | A GitHub admin must activate branch protection on `task/lboi/use_chaye_api_backend`. | blocked |
| FE-TECH-001 | Frontend lint and formatting foundation. | Added `npm run lint`, Prettier config, explicit dev dependencies, and CI lint execution. | `package.json`, `.prettierrc`, `.github/workflows/test.yml`. | implemented |
| FE-TECH-002 | Vite frontend build foundation. | Replaced Create React App with Vite, moved the HTML entrypoint, migrated tests to Vitest, and switched API URL handling to `VITE_API_URL`. | `package.json`, `vite.config.ts`, `index.html`, `src/lib/api.js`, `Dockerfile`. | implemented |
| FE-TECH-003 | Progressive TypeScript foundation. | Added strict TypeScript configuration, `npm run typecheck`, and shared entity/API response types without converting the existing JavaScript app. | `tsconfig.json`, `src/types/`, `docs/quality-gates.md`. | implemented |
| FE-TECH-004 | Central API client and auth token handling. | Added `src/lib/api.js`, replaced direct component Axios usage, centralized API URLs/assets/auth token updates, and retained `setAuthToken` as a compatibility re-export. | `src/lib/api.js`, `src/Services/`, components using API calls. | implemented |
| FE-TECH-006 | Frontend tests and async stability. | Added API client unit tests and removed the open-handle warning from the frontend test run. | `src/lib/api.test.js`, `src/App.test.js`. | implemented |
