const cheerio = require('cheerio');
const axios = require('axios');
const _ = require('lodash');
const ObjectsToCsv = require('objects-to-csv');

const BASE_URL = 'http://www.leafninja.com/';
const CLAN_LINKS = ['http://www.leafninja.com/clans.php'];
const fetch = async url => {
  const { data } = await axios.get(url);
  return cheerio.load(data);
};
const requests = CLAN_LINKS.map(link => fetch(link));

const getName = html => {
  const $ = html;
  const name = $.find('b').text();

  return name;
};
const getGeneralInfo = html => {
  const $ = html;
  // remove table if its in there for some reason
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
  const description = $.find('font').text();

  return _.unescape(description.trim());
};
const loadAll = async requests => {
  const responses = await Promise.all(requests);
  const clans = [];

  responses.forEach(response => {
    // 2nd table > tbody > tr > 3rd td > table > tbody > skip 1st tr > every group of 3 tr is a character
    const $ = response;
    let counter = 0;
    let name, infos, avatarSrc, description;
    $('table')
      .next()
      .find('> tbody > tr > td:nth-child(3) > table > tbody > tr')
      .each(function (i, _) {
        if (i > 1) {
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

            const clan = {
              name,
              ...infos,
              avatarSrc,
              description,
            };

            clans.push(clan);

            name = infos = avatarSrc = description = undefined;
          }
        }
      });
  });

  // console.log(clans);
  return clans;
};

const load = async () => {
  const clans = await loadAll(requests);
  new ObjectsToCsv(clans).toDisk('./clans.csv', {
    allColumns: true,
  });
};

load();
