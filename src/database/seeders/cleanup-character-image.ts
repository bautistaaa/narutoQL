require('dotenv').config();
import AWS from 'aws-sdk';
import fetch from 'node-fetch';
import { connectDb } from '../';
import { CharacterModel } from '../../graphql/character';

export default async function cleanUpCharacterImageSrc() {
  const s3 = new AWS.S3();
  const mongoose = await connectDb();

  console.log(
    'Seeding characters to database:' + mongoose.connection.name + '...'
  );

  const charactersNotUploaded = await CharacterModel.find({
    avatarSrc: new RegExp('leafninja', 'i'),
  }).limit(100);
  charactersNotUploaded.forEach(async (character: any) => {
    //character.avatarSrc = character.avatarSrc.replace('www.', '');
    //character.save();
    try {
      const image = await fetch(character.avatarSrc, {
        headers: {
          referer: 'http://www.leafninja.com',
        },
      });
      const fileName = character.avatarSrc.split('/').pop().split('.')[0];
      const buffer = await image.buffer();
      const params = {
        Bucket: 'narutoql',
        Key: `${fileName}.jpg`, // File name you want to save as in S3
        Body: buffer,
        ContentType: 'image/jpeg',
      };

      s3.upload(params, function (err, data) {
        if (err) {
          console.log(err);
        }

        console.log(`File uploaded successfully. ${data.Location}`);
        character.avatarSrc = `https://narutoql.s3.amazonaws.com/${fileName}.jpg`;
        character.save();
        console.log(`saved avatarSrc of ${character.avatarSrc}`);
      });
    } catch (error) {
      console.log(error);
    }
  });
}

cleanUpCharacterImageSrc();
