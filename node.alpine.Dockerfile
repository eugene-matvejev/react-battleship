FROM alpine

RUN apk add --no-cache nodejs

ENTRYPOINT /bin/sh
