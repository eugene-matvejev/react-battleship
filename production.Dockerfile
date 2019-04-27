FROM alpine

RUN apk add --no-cache nodejs nodejs-npm

WORKDIR /www

RUN npm i serve --verbose -g

ENTRYPOINT /bin/sh
