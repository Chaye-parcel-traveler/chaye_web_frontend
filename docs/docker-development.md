# Chaye Web Frontend Docker Notes

The frontend currently has a Dockerfile, but no Docker Compose development stack.

## Current Dockerfile Behavior

The Dockerfile:

- Uses `node:20-alpine` for dependency install and build.
- Runs `npm ci`.
- Builds the Vite React app with `npm run build`.
- Accepts `VITE_API_URL` as a build argument.
- Serves the production build with `socialengine/nginx-spa:latest`.
- Exposes port `80` in the production image.

This is a production-style static build. It is not a hot-reload development container.

## Production Build Check

From `chaye_web_frontend/`:

```bash
docker build --build-arg VITE_API_URL=http://localhost:3333 -t chaye-web-frontend .
```

Run the built image:

```bash
docker run --rm -p 3000:80 chaye-web-frontend
```

Then open:

```text
http://localhost:3000
```

## Host Development Fallback

Until a frontend Docker Compose service exists, interactive hot-reload development may use Vite directly only as a fallback:

```bash
VITE_API_URL=http://localhost:3333 npm start
```

The app normally runs at:

```text
http://localhost:3000
```

## API URL

The app sets the Axios base URL from:

```js
import.meta.env.VITE_API_URL
```

Default API URL when the backend Docker Compose stack is running:

```text
http://localhost:3333
```

Known legacy issue:

- Some components still call `http://localhost:5000` directly.
- New code must not copy those hardcoded URLs.
- When touching those screens, migrate calls to the configured Axios base URL.

## Recommended Future Dev Compose

If the team wants full Docker development for the frontend, add a compose service that:

- Uses a Node LTS image compatible with Vite.
- Mounts the repository into `/home/node/app`.
- Preserves `node_modules` with a container volume.
- Sets `VITE_API_URL=http://localhost:3333`.
- Runs `npm start`.
- Exposes `3000:3000`.
- Keeps hot reload working.

## Agent Rules

- Do not describe the current frontend Dockerfile as a development stack.
- Always run validation through Docker first.
- For lint, tests, typecheck, and build, use the one-shot Node container documented in `docs/quality-gates.md`.
- Use host `npm start` only for interactive hot-reload development when no Docker Compose service exists.
- Host validation commands are only a last-resort fallback when Docker is unavailable or broken, and the reason must be documented.
- Use the Docker production image build for deployment validation.
- Keep `VITE_API_URL` documented when API ports or routing change.
