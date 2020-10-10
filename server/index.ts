import app from './app';

import models, { connectDb } from '../database/model';

const PORT = process.env.PORT;

connectDb().then(async mongoose => {
  mongoose.Promise = global.Promise;

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
  });
});
