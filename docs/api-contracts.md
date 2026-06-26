# API Contracts

This document is technical and intentionally written in English.

## API URL

The frontend must use:

```js
import.meta.env.VITE_API_URL
```

or the configured Axios base URL.

Default backend Docker URL:

```text
http://localhost:3333
```

## Payload Rules

- Backend public payloads use camelCase.
- Do not send snake_case fields unless the backend validator explicitly accepts them.
- Show backend validation errors when available.

## CGU Contract

- `POST /members` must send `acceptedCguVersion` when the user creates an account.
- The signup UI must block submit if the CGU checkbox is unchecked, but backend validation remains the source of truth.
- `POST /auth/accept-cgu` records a new CGU acceptance for an authenticated user.
- The API currently records the version supplied by the frontend; it does not expose the current CGU version.
- Before implementing FE-CGU-001, decide whether the current CGU version comes from frontend configuration or a public legal config endpoint.

## Known Contract Issues

- `AddAnnouncements.js` now sends `departingFrom`, `arrivingAt`, `weightAvailability`.
- Frontend source code now uses the configured Axios base URL instead of hardcoded `http://localhost:5000` API calls.
- Signup currently does not send `acceptedCguVersion` and will fail against the CGU-enabled API.
