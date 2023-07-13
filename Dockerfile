ARG NGINX_SPA_IMAGE=socialengine/nginx-spa:latest

FROM $NGINX_SPA_IMAGE AS production
COPY ./build /app
RUN chmod -R 777 /app