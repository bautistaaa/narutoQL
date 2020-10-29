import AWS from 'aws-sdk';
//import fs from 'fs';
import fetch from 'node-fetch';

const s3 = new AWS.S3();

const fetchImage = async () => {
  const image = await fetch(
    'http://leafninja.com/images/information/Satetsu.jpg',
    {
      headers: {
        referer: 'http://www.leafninja.com',
      },
    }
  );

  const buffer = await image.buffer();
  const params = {
    Bucket: 'narutoql',
    Key: 'test.jpg', // File name you want to save as in S3
    Body: buffer,
    ContentType: 'image/jpeg',
  };

  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

fetchImage();

//const buffer = await image.buffer();
//fs.writeFile('test.jpg', buffer, error => {
//if (error) {
//console.log('shit');
//return;
//}
//console.log('yes');
//return;
//});
//const buffer = await image.buffer();
//fs.writeFile('test.jpg', buffer, error => {
//if (error) {
//console.log('shit');
//return;
//}
//console.log('yes');
//return;
//});
