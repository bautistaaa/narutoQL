# NarutoQL
![](https://media1.giphy.com/media/rrTXn4zEMp008/giphy.gif)
## Introduction

This was built live on [twitch](https://www.twitch.tv/trash_dev) so it is far from perfect.

You can also view the live [documentation](https://narutoql.com/docs)

## Getting Started

Make sure you have docker installed.
`docker-compose-up` (Note: slow reload times on node app (~5s) somebody help? Client reloads fine)

**Alternatively,**

`npm run dev` in `src/client` to run [NextJS](https://nextjs.org/) app

`npm run dev` in `src/server` to run [Express](https://expressjs.com/) app

### Seed Data
- Docker flow: `docker exec` into node container and run `npm run seed`
- Or just `npm run seed` in `server` directory

## Resources

- [GraphQL](https://graphql.org/)
- [type-graphql](https://github.com/MichalLytek/type-graphql)
- [typegoose](https://typegoose.github.io/typegoose/)
- [TypeScript](http://typescriptlang.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)
