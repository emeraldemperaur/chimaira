FROM node:24-alpine3.20
WORKDIR /app
COPY package.json ./
COPY iliad.db ./
COPY .env ./
COPY server ./server
RUN ls -a
RUN npm install && npm install -g nodemon

EXPOSE 3001

CMD ["npm", "run", "server"]