FROM node:24-alpine3.20
WORKDIR /app
COPY package.json ./
COPY index.html ./
COPY vite.config.js ./
COPY src ./src
COPY public ./public
RUN ls -a
RUN npm install && npm install -g nodemon

EXPOSE 5173

CMD ["npm", "run", "dev"]