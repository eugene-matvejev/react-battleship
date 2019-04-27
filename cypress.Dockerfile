FROM cypress/browsers:chrome69

WORKDIR /www

COPY ./cypress/package.json ./cypress/package-lock.json ./

RUN npm i --verbose --production

RUN npx cypress verify

ENTRYPOINT /bin/sh

