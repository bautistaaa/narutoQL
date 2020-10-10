const cheerio = require('cheerio');
const axios = require('axios');
const _ = require('lodash');
const ObjectsToCsv = require('objects-to-csv');

const BASE_URL = 'http://www.leafninja.com/';
const BIO_LINKS = [
  'http://www.leafninja.com/biographies-A.php',
  'http://www.leafninja.com/biographies-B.php',
  'http://www.leafninja.com/biographies-C.php',
  'http://www.leafninja.com/biographies-D.php',
  // 'http://www.leafninja.com/biographies-E.php',   THIS ONE IS BAD -- HAS EXTRA TR
  'http://www.leafninja.com/biographies-F.php',
  'http://www.leafninja.com/biographies-G.php',
  'http://www.leafninja.com/biographies-H.php',
  'http://www.leafninja.com/biographies-I.php',
  'http://www.leafninja.com/biographies-J.php',
  'http://www.leafninja.com/biographies-K.php',
  // 'http://www.leafninja.com/biographies-L.php', HAS NO DATA
  'http://www.leafninja.com/biographies-M.php',
  'http://www.leafninja.com/biographies-N.php',
  'http://www.leafninja.com/biographies-O.php',
  'http://www.leafninja.com/biographies-P.php',
  // 'http://www.leafninja.com/biographies-Q.php', HAS NO DATA
  'http://www.leafninja.com/biographies-R.php',
  'http://www.leafninja.com/biographies-S.php',
  'http://www.leafninja.com/biographies-T.php',
  'http://www.leafninja.com/biographies-U.php',
  // 'http://www.leafninja.com/biographies-V.php', HAS NO DATA
  'http://www.leafninja.com/biographies-W.php',
  // 'http://www.leafninja.com/biographies-X.php', HAS NO DATA
  'http://www.leafninja.com/biographies-Y.php',
  'http://www.leafninja.com/biographies-Z.php',
  'http://www.leafninja.com/other.php',
  'http://www.leafninja.com/miscbio-1.php',
  // 'http://www.leafninja.com/miscbio-2.php', // EXTA TR IN GIICHI
  'http://www.leafninja.com/miscbio-3.php',
  'http://www.leafninja.com/miscbio-4.php',
  'http://www.leafninja.com/miscbio-5.php',
  'http://www.leafninja.com/miscbio-6.php',
  'http://www.leafninja.com/miscbio-7.php',
  'http://www.leafninja.com/miscbio-8.php',
];
const fetch = async url => {
  const { data } = await axios.get(url);
  return cheerio.load(data);
};
const requests = BIO_LINKS.map(link => fetch(link));

const getName = html => {
  const $ = html;
  const name = $.find('a').text(); // or html?

  return name;
};
const getGeneralInfo = html => {
  const $ = html;
  $.find('td').next().find('font table').remove();
  const infoHtml = $.find('td').next().find('font').html();
  const information = infoHtml
    .split('<br>')
    .map(html => html.replace(/(<b>|<\/b>|\n)/g, '').trim())
    .filter(x => !_.isEmpty(x))
    .map(x => {
      const [key, value] = x.split(':');
      return {
        key: key && key.trim(),
        value: value && value.trim(),
      };
    })
    .reduce((acc, curr) => {
      const { key, value } = curr;
      return {
        ...acc,
        [key]: _.unescape(value),
      };
    }, {});

  return information;
};
const getAvatarSrc = html => {
  const $ = html;

  const avatarHtml = $.find('td').html();
  const strippedAvatarHtml = avatarHtml.replace(/\s/g, '');
  const regex = /<imgsrc="(?<src>.*?)"/g;
  const result = regex.exec(strippedAvatarHtml);
  const avatarSrc = result.groups.src;

  return `${BASE_URL}${avatarSrc}`;
};
const getDescription = html => {
  const $ = html;
  const descriptionHtml = $.find('font').html();
  const description = descriptionHtml.split('<br>');
  return _.unescape(description[0].trim());
};

const loadAll = async requests => {
  const responses = await Promise.all(requests);
  const characters = [];

  responses.forEach(response => {
    // 2nd table > tbody > tr > 3rd td > table > tbody > skip 1st tr > every group of 3 tr is a character
    const $ = response;
    let counter = 0;
    let name, infos, avatarSrc, description;

    $('table')
      .next()
      .find('> tbody > tr > td:nth-child(3) > table > tbody > tr')
      .each(function (i, _) {
        if (i > 0) {
          ++counter;
          if (counter === 1) {
            name = getName($(this));
          }

          if (counter === 2) {
            infos = getGeneralInfo($(this));
            avatarSrc = getAvatarSrc($(this));
          }

          if (counter === 3) {
            counter = 0;

            description = getDescription($(this));

            const character = {
              name,
              ...infos,
              avatarSrc,
              description,
            };

            characters.push(character);
            name = infos = avatarSrc = description = undefined;
          }
        }
      });
  });

  // console.log(characters);
  return characters;
};
const load = async () => {
  const clans = await loadAll(requests);
  new ObjectsToCsv(clans).toDisk('./characters.csv', {
    allColumns: true,
  });
};

load();
