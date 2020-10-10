require('dotenv').config();
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { connectDb } from '../../database/model';
import Village from '../model/village';

export default async function seedVillage() {
  const mongoose = await connectDb();

  console.log(
    'Seeding village to database:' + mongoose.connection.name + '...'
  );

  Village.deleteMany({}, () => {
    console.log('Truncated Villages successfully!');
    const villages: any[] = [];
    const stream = fs.createReadStream(
      path.resolve(process.cwd(), 'villages.csv')
    );

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
      });
  });
}
