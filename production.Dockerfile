FROM alpine

RUN apk add --no-cache nodejs nodejs-npm

WORKDIR /www

COPY serve.json ./

RUN npm i serve --verbose -g

COPY build ./build

ENTRYPOINT /bin/sh
