FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY . .

WORKDIR /usr/src/app/client
RUN npm install && npm run build

WORKDIR /usr/src/app

EXPOSE 5000

CMD ["npm","start"]