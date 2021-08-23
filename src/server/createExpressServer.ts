import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import validateJwt from './middlewares/validateJwt';

const createExpressServer = (apolloServer: ApolloServer): Express => {
  const app = express();

  app.use(morgan(':status | :method :url :response-time ms | :remote-addr'));

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(compression());
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(validateJwt);
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: 'http://localhost:3000',
    },
  });

  app.get('/', (_, res) => res.send('k it works Express + TypeScript Server'));
  app.post('/api/uploadPhoto', (req, res) => {});

  return app;
};

export default createExpressServer;
