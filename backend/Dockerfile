# Install dependencies
FROM node:12 AS packages
WORKDIR /app
COPY package*.json ./
RUN npm install

# Compile TypeScripts
FROM packages AS source_build
WORKDIR /app
COPY public ./public
COPY views ./views
COPY routes ./routes
COPY interfaces ./interfaces
COPY configs ./configs
COPY *.js ./
COPY *.ts ./
COPY tsconfig.json tsconfig.json
RUN npm run build

# Get clean production build
FROM packages
WORKDIR /app
COPY --from=source_build /app/dist ./dist
CMD ["npm", "start"]
