FROM node:24-alpine3.20
WORKDIR /app
COPY package.json ./
COPY index.html ./
COPY vite.config.js ./
COPY src ./src
COPY public ./public
RUN ls -a
RUN npm install
RUN npm i -g serve
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]