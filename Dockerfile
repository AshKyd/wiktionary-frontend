FROM node:22-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm ci && npm run build

FROM nginx:stable-alpine
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx.conf /etc/nginx/nginx.conf
RUN apk update && apk upgrade
COPY --from=0 /usr/src/app/dist /usr/share/nginx/html
RUN  chmod o+r -R /usr/share/nginx/html
