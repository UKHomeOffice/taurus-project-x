FROM node:9.4-alpine

RUN npm install -g forever --quiet
WORKDIR /taurus-project-x
EXPOSE 80

COPY package.json .
RUN npm install --quiet
COPY dist dist

CMD ["forever", "/taurus-project-x/dist/index.js"]