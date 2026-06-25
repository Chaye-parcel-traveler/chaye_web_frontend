# Chaye Web Frontend Code Vs Spec Audit

The full code/spec audit is maintained in `../chaye_API/docs/code-vs-spec.md`.
This document captures frontend-specific findings.

Last audited: 2026-06-24.

## Current Frontend Surface

Existing components include:

- Home/about/support/FAQ pages.
- Login/signup flows.
- Member list, profile, edit member.
- Announcements list and add announcement.
- Package screens.
- Message screens.
- Footer legal pages.

## Sprint 1 Frontend Gap

| ID | Requirement | Current state | Gap |
| --- | --- | --- | --- |
| LEG-001-FE | Legal notices accessible from footer and login. | Footer link exists; `MentionsLegales` page exists. | Content has placeholders and generic wording; login screen access needs consistency review. |
| LEG-002-FE | Mandatory CGU checkbox during signup. | Signup forms do not include CGU acceptance. | Add checkbox, block submit, send accepted CGU version. |
| LEG-003-FE | Report action/form. | No report UI found. | Add report action on profile and announcement first. |
| LEG-004-FE | Admin moderation page. | No admin moderation UI found. | Add after backend endpoints exist. |
| LEG-005-FE | Suspended account state. | No member status UI found. | Display suspended/banned state and disable transactional actions. |
| LEG-006-FE | Birth date and minor blocking. | Signup forms do not collect birth date. | Add birth date, minor warning, disabled publish/book UX. |

## Integration Issues

| Area | Finding | Impact |
| --- | --- | --- |
| API URL | Axios base URL comes from `VITE_API_URL`. | Correct pattern for new code. |
| Hardcoded URLs | Some components use `http://localhost:5000`. | Legacy debt; incompatible with current Docker API URL. |
| Announcement payload | `AddAnnouncements.js` uses snake_case field names. | Backend validator expects camelCase; request likely fails. |
| Announcement type | UI says parcel shipping but posts `type: 'transport'`. | Business meaning is likely wrong. |
| Login/signup routing | Some links reference `/login` and `/signup`; active combined route is `/loginSignup`. | Navigation should be normalized. |
| Social auth | Google flow exists; other social buttons are inconsistent placeholders. | Needs cleanup before launch. |

## Priority Recommendations

1. Do not start with visual redesign.
2. Implement CGU and birth date on signup after backend validators exist.
3. Fix announcement payload casing when touching announcement creation.
4. Replace hardcoded `localhost:5000` calls with Axios base URL as screens are updated.
5. Add report UI only after the backend report endpoint contract is stable.
