FROM node

WORKDIR /usr/src/app

COPY ./static .

RUN npm install

CMD [ "npm", "start" ]