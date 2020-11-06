FROM node:12

RUN mkdir /server

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

#RUN npm run seed

CMD ["npm", "run", "start"]
