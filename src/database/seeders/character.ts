require('dotenv').config();
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { connectDb } from '../model';
import Character from '../model/character';
//import Village from '../model/village';

export default async function seedClan() {
  const mongoose = await connectDb();

  console.log(
    'Seeding characters to database:' + mongoose.connection.name + '...'
  );

  const truncated = await Character.deleteMany({});

  console.log(`character truncated: ${JSON.stringify(truncated)}`);
  console.log('Truncated Character successfully!');
  const characters: any[] = [];
  const stream = fs.createReadStream(
    path.resolve(process.cwd(), 'characters.csv')
  );

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv())
      .on('data', character => characters.push(character))
      .on('end', async () => {
        await Promise.all(
          characters.map(async character => {
            //const characterVillage = await Village.findOne({
            //name: character.village.toLowerCase(),
            //});
            // save image

            const newCharacter = new Character({
              ...character,
              name: character.name.trim(),
              village: character.village.toLowerCase(),
            });
            await newCharacter.save();
          })
        );
        console.log('Succesfully seeded Character!');
        stream.destroy();
        resolve();
      })
      .on('error', () => reject('character seeder failed!'));
  });
}
