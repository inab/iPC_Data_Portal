FROM node:13.13.0-alpine

WORKDIR /app

COPY . /app

RUN npm install

CMD ["npm", "start"]
