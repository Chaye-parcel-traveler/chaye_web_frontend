# GitHub Governance

Ce document décrit la configuration GitHub attendue pour sécuriser le workflow.

## État Actuel

- Les issues et labels agentiques sont créés.
- Les milestones sont créés.
- Les templates issue/PR, CODEOWNERS et la CI frontend sont présents localement.
- La protection de branche n'a pas pu être appliquée par l'agent: le compte `gh` a `viewerPermission=WRITE`, pas `ADMIN`.

Issue de suivi:

- https://github.com/Chaye-parcel-traveler/chaye_web_frontend/issues/13

## Branche À Protéger

- `task/lboi/use_chaye_api_backend`

Cette branche est la branche par défaut actuelle du repo frontend.

## Règles À Activer

- Require a pull request before merging.
- Require at least 1 approving review.
- Require review from Code Owners.
- Dismiss stale approvals when new commits are pushed.
- Require conversation resolution before merging.
- Require branches to be up to date before merging.
- Block force pushes.
- Block branch deletion.

Required status checks:

- `test`
- `build`

## Notes

Ces noms de checks correspondent aux jobs GitHub Actions attendus dans `.github/workflows/test.yml`.

