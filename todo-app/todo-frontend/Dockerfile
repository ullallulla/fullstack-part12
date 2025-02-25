FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL="http://localhost:8080/api"

RUN npm run build

CMD ["npm", "run", "preview", "--", "--host"]

FROM build-stage AS test

RUN npm run test
