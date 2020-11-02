FROM node:12

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

RUN npm run seed

CMD ["npm", "run", "start"]
