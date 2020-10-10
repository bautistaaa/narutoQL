const ObjectsToCsv = require('objects-to-csv');

const villages = [
  {
    name: 'leaf village',
  },
  {
    name: 'rock village',
  },
  {
    name: 'mist village',
  },
  {
    name: 'cloud village',
  },
  {
    name: 'sand village',
  },
  {
    name: 'rain village',
  },
  {
    name: 'waterfall village',
  },
  {
    name: 'grass village',
  },
  {
    name: 'sound village',
  },
  {
    name: 'hot springs village',
  },
  {
    name: 'whirling tides village',
  },
  {
    name: 'stone village',
  },
  {
    name: 'star village',
  },
  {
    name: 'heat haze village',
  },
  {
    name: 'craftsman village',
  },
  {
    name: 'lock village',
  },
  {
    name: 'pink flower village',
  },
];
const load = () => {
  new ObjectsToCsv(villages).toDisk('./villages.csv');
};

load();
