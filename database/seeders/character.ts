require('dotenv').config();
import csv from 'csv-parser';
import path from 'path';
import fs from 'fs';

import { connectDb } from '../../database/model';
import Character from '../model/character';
import Village from '../model/village';

export default async function seedClan() {
  const mongoose = await connectDb();

  console.log(
    'Seeding characters to database:' + mongoose.connection.name + '...'
  );

  Character.deleteMany({}, () => {
    console.log('Truncated Character successfully!');
    const characters: any[] = [];
    const stream = fs.createReadStream(
      path.resolve(process.cwd(), 'characters.csv')
    );

    stream
      .pipe(csv())
      .on('data', character => characters.push(character))
      .on('end', async () => {
        await Promise.all(
          characters.map(async character => {
            const characterVillage = await Village.findOne({
              name: character.village.toLowerCase(),
            });

            const newCharacter = new Character({
              ...character,
              village: characterVillage,
            });
            await newCharacter.save();
          })
        );
        console.log('Succesfully seeded Character!');
        stream.destroy();
      });
  });
}
