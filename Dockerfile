FROM node:13.13.0-alpine

WORKDIR /app

COPY . .

RUN npm install

COPY Arranger.js ./node_modules/@arranger/components/dist/Arranger

CMD ["npm", "start"]
