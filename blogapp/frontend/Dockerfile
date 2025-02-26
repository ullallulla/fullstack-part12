FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:8080"

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host"]
