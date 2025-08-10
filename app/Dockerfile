FROM node:20.19-alpine3.21 AS build

ENV NODE_ENV=production \
    APP_SRC=/usr/src/app

WORKDIR $APP_SRC
COPY . .
RUN npm run build



FROM nginx:1.29-alpine

ENV APP_SRC=/usr/src/app \
    APP_DIST=/usr/src/app/dist \
    APP_HOME=/usr/share/nginx/html/flags \
    NGINX_CONF_HOME=/etc/nginx
RUN mkdir -p $APP_HOME
COPY --from=build $APP_DIST $APP_HOME
COPY --from=build $APP_SRC/nginx.conf $NGINX_CONF_HOME