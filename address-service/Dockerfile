FROM node:12-alpine

COPY . /src

WORKDIR /src

RUN npm install --only=prod

EXPOSE 3000 8080

CMD npm start