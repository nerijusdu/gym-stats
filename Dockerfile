FROM postgres as database

ENV POSTGRES_PASSWORD dummypass
ENV POSTGRES_DB gym-stats

RUN docker-entrypoint.sh -c 'shared_buffers=256MB' -c 'max_connections=200'

FROM node:lts as base

ARG DATABASE_URL
ARG PORT=3000
ENV DATABASE_URL "postgresql://postgres:dummypass@localhost:5432/gym-stats"

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY db/ ./db/
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

EXPOSE ${PORT}

CMD npm blitz prisma migrate deploy && npm start -p ${PORT}
