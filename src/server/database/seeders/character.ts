require('dotenv').config();
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { connectDb } from '../';
import { CharacterModel } from '../../graphql/character';

export default async function seedClan() {
  const mongoose = await connectDb();

  console.log(
    'Seeding characters to database:' + mongoose.connection.name + '...'
  );

  const truncated = await CharacterModel.deleteMany({});

  console.log(`character truncated: ${JSON.stringify(truncated)}`);
  console.log('Truncated CharacterModel successfully!');
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

            const newCharacter = new CharacterModel({
              ...character,
              name: character.name.trim(),
              village: character.village.toLowerCase(),
            });
            await newCharacter.save();
          })
        );
        console.log('Succesfully seeded CharacterModel!');
        stream.destroy();
        resolve();
      })
      .on('error', () => reject('character seeder failed!'));
  });
}
