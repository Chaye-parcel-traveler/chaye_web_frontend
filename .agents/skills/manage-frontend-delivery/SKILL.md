---
name: manage-frontend-delivery
description: Manage Chaye frontend delivery and documentation ownership. Use for GitHub issues, labels, branches, pull requests, CI checks, CODEOWNERS, repository workflow, documentation synchronization, or source-of-truth cleanup.
---

# Manage Frontend Delivery

1. Use repository `Chaye-parcel-traveler/chaye_web_frontend`.
2. Before creating an issue, list open and closed issues and check for
   duplicates.
3. Write functional scope and acceptance criteria in French. Keep code,
   endpoints, fields, commands, filenames, and automation labels in English.
4. Scope issues by verifiable UI capability. Include dependencies, risks,
   validation, and screenshots when visual behavior changes.
5. Before a PR, inspect the diff, run applicable Docker validation, and use
   `.github/pull_request_template.md`.
6. Update the owning source only:
   - HTTP contract: API OpenAPI.
   - Product or compliance rule: `../chaye_documentations/`.
   - Backlog and status: GitHub Issues and PRs.
   - Frontend setup and structure: `README.md`.
   - Universal agent rules: `AGENTS.md`.
7. Do not create local Markdown backlogs, architecture snapshots, quality-gate
   guides, or manual API contracts.
