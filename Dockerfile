FROM alpine

RUN apk add --no-cache nodejs nodejs-npm

WORKDIR /www

COPY package.json package-lock.json ./

RUN npm i --verbose

ENTRYPOINT /bin/sh
