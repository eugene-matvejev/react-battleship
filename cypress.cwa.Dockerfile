FROM alpine AS cwa

WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm

COPY package.json package-lock.json ./

RUN npm i --verbose --production

COPY public ./public
COPY src ./src
COPY .env ./

RUN npm run build

###################################################
## 'serve' image with encapsulated static assets ##
###################################################

FROM alpine

WORKDIR /www

RUN apk add --no-cache nodejs nodejs-npm \
    && npm i serve --verbose -g \
    && apk del nodejs-npm

COPY serve.json ./
COPY --from=cwa /www/build /www/build

ENTRYPOINT /bin/sh
