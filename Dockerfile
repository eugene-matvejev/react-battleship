FROM alpine

WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm

COPY package.json package-lock.json ./

RUN npm i --verbose
