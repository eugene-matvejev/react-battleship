FROM alpine

RUN apk add --no-cache nodejs nodejs-npm

WORKDIR /www

# ENV PATH /www/node_modules/.bin:$PATH

COPY package.json package-lock.json ./

RUN npm i --verbose

ENTRYPOINT /bin/sh
