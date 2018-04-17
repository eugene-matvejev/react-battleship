# FROM node:8.11.1
FROM cwa-node.alpine

WORKDIR /www

ENV PATH /www/node_modules/.bin:$PATH

COPY package.json ./

RUN npm i --verbose

ENTRYPOINT npm run build
