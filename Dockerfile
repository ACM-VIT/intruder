FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm config set unsafe-perm true

RUN npm i typescript -g && \
npm install

COPY server /app/server

WORKDIR /app/server

RUN npm install

WORKDIR /app

RUN npm run server-build

CMD ["npm", "run", "server-lift"]
