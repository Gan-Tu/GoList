FROM node:12
WORKDIR /app
COPY . .
RUN npm rebuild node-sass
RUN npm install
CMD ["npm", "start"]