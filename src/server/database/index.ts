import 'reflect-metadata';
import mongoose from 'mongoose';

const dbUrl = process.env.DATABASE_URL;
const connectDb = () => {
  if (dbUrl) {
    return mongoose.connect(dbUrl);
  }
  console.error(`no db url provided!!`);
  throw Error('no db connected');
};

export { connectDb };
