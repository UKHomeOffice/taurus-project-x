FROM node:9.4-alpine

WORKDIR /taurus-project-x

RUN apk add --update curl

COPY package.json .
RUN npm install --quiet
COPY dist dist

RUN adduser -S tpx
RUN chown tpx -R *
USER tpx
CMD ["node", "/taurus-project-x/dist/index.js"]