FROM alpine

WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm \
    && npm i serve --verbose -g

ENTRYPOINT /bin/sh
