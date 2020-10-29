import dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';

import mongoose from 'mongoose';
import { connectDb } from './database/model';
import createExpressServer from './createExpressServer';
import createGraphqlServer from './createGraphqlServer';

const PORT = process.env.PORT;

const start = async () => {
  await connectDb();
  mongoose.Promise = global.Promise;
  const apolloServer = await createGraphqlServer();
  const app = createExpressServer(apolloServer);

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
};

start();
