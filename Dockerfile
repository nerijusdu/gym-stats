FROM node:lts

ARG DATABASE_URL
ARG PORT=3000
ENV DATABASE_URL ${DATABASE_URL}

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
COPY db/ ./db/
RUN npm install

COPY . .
RUN npm run build

EXPOSE ${PORT}

CMD npm blitz prisma migrate deploy && npm start -p ${PORT}
