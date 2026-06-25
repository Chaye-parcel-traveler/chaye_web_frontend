# API Contracts

This document is technical and intentionally written in English.

## API URL

The frontend must use:

```js
process.env.REACT_APP_API_URL
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

## Known Contract Issues

- `AddAnnouncements.js` now sends `departingFrom`, `arrivingAt`, `weightAvailability`.
- Frontend source code now uses the configured Axios base URL instead of hardcoded `http://localhost:5000` API calls.
