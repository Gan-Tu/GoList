FROM node:12
WORKDIR /app
RUN npm rebuild node-sass
COPY package.json .
COPY bin ./bin
COPY app.js .
COPY client ./client
RUN npm install
RUN npm run build
CMD ["npm", "start"]