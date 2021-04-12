FROM node:12
WORKDIR /app
RUN npm rebuild node-sass
COPY package.json .
COPY client/package.json ./client/package.json
COPY bin ./bin
COPY app.js .
COPY client/public ./client/public
COPY client/src ./client/src
RUN npm install
RUN npm run build
CMD ["npm", "start"]