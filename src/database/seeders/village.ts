require('dotenv').config();
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { connectDb } from '../model';
import Village from '../model/village';

export default async function seedVillage() {
  const mongoose = await connectDb();

  console.log(
    'Seeding village to database:' + mongoose.connection.name + '...'
  );

  const truncated = await Village.deleteMany({});

  console.log(`village truncated: ${JSON.stringify(truncated)}`);
  console.log('Truncated Villages successfully!');

  const villages: any[] = [];
  const stream = fs.createReadStream(
    path.resolve(process.cwd(), 'villages.csv')
  );
  return new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', village => {
        villages.push(village);
      })
      .on('end', async () => {
        await Promise.all(
          villages.map(async village => {
            const newVillage = new Village(village);
            await newVillage.save();
          })
        );
        console.log('Succesfully seeded Village!');
        stream.destroy();
        resolve();
      })
      .on('error', () => reject('Village Seeder Failed'));
  });
}
