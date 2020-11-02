import express, { Express } from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

const createExpressServer = (apolloServer: ApolloServer): Express => {
  const app = express();

  app.use(morgan(':status | :method :url :response-time ms | :remote-addr'));

  app.use(cors());
  app.use(compression());

  apolloServer.applyMiddleware({ app });

  app.get('/', (_, res) => res.send('k it works Express + TypeScript Server'));

  return app;
};

export default createExpressServer;
