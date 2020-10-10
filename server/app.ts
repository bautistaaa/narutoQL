import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';

import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';

import resolvers from './resolvers';
import typeDefs from './typeDefs';

const app = express();

app.use(morgan(':status | :method :url :response-time ms | :remote-addr'));

const server = new ApolloServer({
  resolvers,
  typeDefs,
  validationRules: [depthLimit(4)],
});

app.use(cors());
app.use(compression());

server.applyMiddleware({ app });

app.get('/', (_, res) => res.send('k it works Express + TypeScript Server'));

export default app;
