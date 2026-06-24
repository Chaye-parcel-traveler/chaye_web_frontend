# ADR 0002 - API Client Policy

## Status

Accepted.

## Context

The frontend currently mixes configured Axios calls with hardcoded `localhost` URLs.

## Decision

All new API calls must use `REACT_APP_API_URL` through Axios configuration or a service wrapper.

## Consequences

- No new hardcoded API hosts are allowed.
- Touched legacy screens should migrate away from `http://localhost:5000`.
- API payload names must match backend validators.

