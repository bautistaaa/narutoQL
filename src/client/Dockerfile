FROM node:12

RUN mkdir /client

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]
