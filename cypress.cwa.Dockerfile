FROM alpine as cwa
RUN apk add --no-cache nodejs nodejs-npm

WORKDIR /www

COPY package.json package-lock.json ./
RUN npm i --verbose --production

COPY public ./public
COPY src ./src
COPY .env ./

RUN npm run build



FROM alpine
WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm \
    && npm i serve --verbose -g

COPY serve.json ./
COPY --from=cwa /www/build /www/build

ENTRYPOINT /bin/sh
