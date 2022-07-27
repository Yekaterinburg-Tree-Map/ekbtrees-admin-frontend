FROM node:14-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./package.json

RUN npm install --production

COPY pages pages
COPY public public
COPY src src
COPY styles styles
COPY next.config.js next.config.js

RUN npm run build

CMD ["npm", "start"]
