FROM cwa-node.alpine

WORKDIR /www

ENV PATH /www/node_modules/.bin:$PATH

COPY package.json ./

RUN npm i --verbose

ENTRYPOINT npm run build
