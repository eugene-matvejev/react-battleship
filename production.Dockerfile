FROM alpine

RUN apk add --no-cache nodejs nodejs-npm

WORKDIR /www

COPY serve.json ./
COPY production.package.json ./package.json

RUN npm i --verbose

COPY build ./build

ENTRYPOINT /bin/sh
