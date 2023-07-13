ARG NODE_IMAGE=node:16-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS build
RUN npm run build

FROM socialengine/nginx-spa:latest AS production
COPY --from=build /home/node/app/build /app
EXPOSE 80
RUN chmod -R 777 /app

