FROM node:9.4-alpine

WORKDIR /taurus-project-x

RUN apk add --update curl

COPY package.json .
RUN npm install --quiet
COPY dist dist

CMD ["node", "/taurus-project-x/dist/index.js"]