FROM node:latest
WORKDIR /usr/src/chatBoxNestJs
COPY package.json .
RUN yarn install
COPY . .
CMD yarn start