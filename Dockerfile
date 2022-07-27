FROM node:16-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY package.json ./package.json

RUN yarn

COPY api ./api
COPY components ./components
COPY hooks ./hooks
COPY pages ./pages
COPY public ./public
COPY styles ./styles
COPY next.config.js ./next.config.js

RUN yarn build

CMD ["npm", "start"]
