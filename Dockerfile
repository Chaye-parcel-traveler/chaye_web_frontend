ARG NODE_IMAGE=node:24-alpine

FROM $NODE_IMAGE AS base
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node

FROM base AS tools
RUN mkdir -p node_modules

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci

FROM dependencies AS source
COPY --chown=node:node . .

FROM source AS development
EXPOSE 3000
CMD ["npm", "start"]

FROM source AS build
ARG VITE_API_URL=${VITE_API_URL}
ARG VITE_CURRENT_CGU_VERSION=${VITE_CURRENT_CGU_VERSION}
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_CURRENT_CGU_VERSION=${VITE_CURRENT_CGU_VERSION}
RUN npm run build

FROM nginx:1.30.3-alpine AS production
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /home/node/app/dist /usr/share/nginx/html
EXPOSE 80
