# ADR 0001 - Agentic Workflow

## Status

Accepted.

## Context

The frontend must support human and AI-agent collaboration without drifting from backend contracts or compliance requirements.

## Decision

- GitHub Issues are the shared backlog.
- Issue content and functional specifications are written in French.
- Technical specifications, code, endpoints, fields, commands, and labels stay in English.
- Each agent task must be tied to an issue.
- Each PR must pass the documented quality gates.
- Frontend compliance controls must be backed by backend enforcement.

## Consequences

- Agents must read `AGENTS.md` and `docs/agent-tickets.md` before implementation.
- Frontend tickets depending on backend contracts must keep `blocked:backend-contract` until endpoints exist.
- Traceability must be updated when implementation state changes.

