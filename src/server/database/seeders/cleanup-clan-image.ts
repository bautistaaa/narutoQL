require('dotenv').config();
import AWS from 'aws-sdk';
import fetch from 'node-fetch';
import { connectDb } from '../';
import { ClanModel } from '../../graphql/clan';

export default async function cleanUpClanImageSrc() {
  const s3 = new AWS.S3();
  const mongoose = await connectDb();

  console.log(
    'Seeding characters to database:' + mongoose.connection.name + '...'
  );

  const clansNotUploaded = await ClanModel.find({
    avatarSrc: new RegExp('leafninja', 'i'),
  }).limit(100);
  clansNotUploaded.forEach(async (clan: any) => {
    try {
      const image = await fetch(clan.avatarSrc, {
        headers: {
          referer: 'http://www.leafninja.com',
        },
      });
      const fileName = clan.avatarSrc.split('/').pop().split('.')[0];
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
        clan.avatarSrc = `https://narutoql.s3.amazonaws.com/${fileName}.jpg`;
        clan.save();
        console.log(`saved avatarSrc of ${clan.avatarSrc}`);
      });
    } catch (error) {
      console.log(error);
    }
  });
}

cleanUpClanImageSrc();
