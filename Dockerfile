# Bitnami images are well-maintained containers that have stuff already
# installed on them, like node 14.15.1, on debian 10
FROM public.ecr.aws/bitnami/node:14.15.1-debian-10-r8

# Change the container workdir to /app
WORKDIR /app

# run the copy command to copy the package.json file
COPY package.json ./
RUN npm install

ENV NODE_ENV=production

COPY ./src/client .

EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]