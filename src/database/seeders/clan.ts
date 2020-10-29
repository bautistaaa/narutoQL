require('dotenv').config();
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { connectDb } from '../model';
import Clan from '../model/clan';
//import Village from '../model/village';

export default async function seedClan() {
  const mongoose = await connectDb();

  console.log('Seeding clan to database:' + mongoose.connection.name + '...');

  const truncated = await Clan.deleteMany({});

  console.log(`clan truncated: ${JSON.stringify(truncated)}`);
  console.log('Truncated Clans successfully!');
  const clans: any[] = [];
  const stream = fs.createReadStream(path.resolve(process.cwd(), 'clans.csv'));
  return new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', clan => clans.push(clan))
      .on('end', async () => {
        await Promise.all(
          clans.map(async clan => {
            //const clanVillage = await Village.findOne({
            //name: clan.village.toLowerCase(),
            //});

            const newClan = new Clan({
              ...clan,
              village: clan.village.toLowerCase(),
            });
            await newClan.save();
          })
        );
        console.log('Succesfully seeded Clan!');
        stream.destroy();
        resolve();
      })
      .on('error', () => reject('clan seeder failed'));
  });
}
