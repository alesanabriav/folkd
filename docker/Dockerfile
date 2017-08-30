FROM ubuntu:16.04

RUN apt-get update && apt-get -y install curl git wget python-software-properties

RUN curl -sL https://deb.nodesource.com/setup_8.x

RUN apt-get install -y nodejs

RUN npm install -g pm2 && npm install -g yarn

RUN mkdir -p /var/www/folkders

WORKDIR /var/www/folkders

RUN yarn install

EXPOSE 3000

CMD NODE_ENV=production pm2 start --no-daemon server.js
