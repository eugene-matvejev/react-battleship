FROM alpine

RUN apk add --no-cache nodejs

WORKDIR /www

ENV PATH /www/node_modules/.bin:$PATH

COPY package.json ./

RUN npm i --verbose

COPY src ./src
COPY public ./public

ENTRYPOINT npm run build
