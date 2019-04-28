FROM cypress/browsers:chrome69

WORKDIR /www

COPY ./cypress/package.json ./cypress/package-lock.json ./

RUN npm i --verbose --production \
    && npx cypress verify
