FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY tsconfig.json src/ ./src
RUN npm run build
CMD ["node", "dist/main.js"]