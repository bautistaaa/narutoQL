import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';

import mongoose from 'mongoose';
import { connectDb, disconnectDb } from './database';
import createExpressServer from './createExpressServer';
import createGraphqlServer from './createGraphqlServer';

const PORT = process.env.PORT;

const start = async () => {
  await connectDb();
  mongoose.Promise = global.Promise;
  const apolloServer = await createGraphqlServer();
  const app = createExpressServer(apolloServer);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });

  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', disconnectDb).on('SIGTERM', disconnectDb);
};

start();
