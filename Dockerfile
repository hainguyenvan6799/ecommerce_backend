FROM node:slim

WORKDIR /urs/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "index.js" ]