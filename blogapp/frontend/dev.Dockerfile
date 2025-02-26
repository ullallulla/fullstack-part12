FROM node:20

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL="http://localhost:8080"

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]