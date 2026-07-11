ARG NODE_IMAGE=node:22-bookworm-slim

FROM $NODE_IMAGE AS base
ENV PNPM_HOME=/home/node/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable && corepack prepare pnpm@9.6.0 --activate
WORKDIR /home/node/app
RUN chown node:node /home/node/app
USER node

FROM base AS dependencies
COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS source
COPY --chown=node:node . .

FROM source AS development
EXPOSE 3000
CMD ["pnpm", "exec", "vite", "--host", "0.0.0.0", "--port", "3000"]

FROM source AS build
ARG VITE_API_ASSETS_URL=http://localhost:3333
ARG VITE_API_URL=http://localhost:3333
ARG VITE_APP_ENV=production
ARG VITE_PUBLIC_ASSETS_URL=/
ENV VITE_API_ASSETS_URL=$VITE_API_ASSETS_URL
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_PUBLIC_ASSETS_URL=$VITE_PUBLIC_ASSETS_URL
RUN pnpm run build

FROM nginx:1.30.3-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/dist /usr/share/nginx/html
EXPOSE 80

FROM dependencies AS playwright-browsers
ARG PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PLAYWRIGHT_BROWSERS_PATH=$PLAYWRIGHT_BROWSERS_PATH
USER root
RUN pnpm exec playwright install --with-deps chromium \
  && chown -R node:node /ms-playwright
USER node

FROM playwright-browsers AS e2e
COPY --chown=node:node . .
CMD ["pnpm", "run", "e2e"]
