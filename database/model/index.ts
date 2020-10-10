import mongoose from 'mongoose';

import Characters from './character';
import Clan from './clan';
import Village from './village';

const dbUrl = process.env.DATABASE_URL;
const connectDb = () => {
  if (dbUrl) {
    return mongoose.connect(dbUrl);
  }
  console.error(`no db url provided!!`);
  throw Error('no db connected');
};

const models = { Characters, Clan, Village };

export { connectDb };

export default models;
