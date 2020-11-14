FROM node:12

RUN mkdir /server

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
