import 'reflect-metadata';
import mongoose from 'mongoose';

const dbUrl = process.env.MONGO_URL;
const connectDb = () => {
  if (dbUrl) {
    return mongoose.connect(dbUrl);
  }
  console.error(`no db url provided!!`);
  throw Error('no db connected');
};
const disconnectDb = () => {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection with DB :' +
        dbUrl +
        ' is disconnected through app termination'
    );
    process.exit(0);
  });
};

export { connectDb, disconnectDb };
