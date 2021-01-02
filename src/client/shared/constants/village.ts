import { Villages } from "../enums/villages";
import { Village } from "../interfaces";

export const RANKS = ['Chuunin', 'Genin', 'Jounin', 'Kage', 'Unknown'];

export const VILLAGE_MAP: {
  [k: string]: Village;
} = {
  'cloud village': {
    color: '#cddadd',
    imgSrc: Villages.cloud,
    filterValue: 'cloud',
  },
  'grass village': {
    color: '#c0e9c0',
    imgSrc: Villages.grass,
    filterValue: 'grass',
  },
  'hot springs village': {
    color: '#fbc089',
    imgSrc: Villages.springs,
    filterValue: 'springs',
  },
  'leaf village': {
    color: '#fcd8d8',
    imgSrc: Villages.leaf,
    filterValue: 'leaf',
  },
  'mist village': {
    color: '#c7e9ff',
    imgSrc: Villages.mist,
    filterValue: 'mist',
  },
  'pink flower village': {
    color: '#f0b2df',
    imgSrc: Villages.flower,
    filterValue: 'flower',
  },
  'rain village': {
    color: '#d4d4ff',
    imgSrc: Villages.rain,
    filterValue: 'rain',
  },
  'sand village': {
    color: '#F1E2A4',
    imgSrc: Villages.sand,
    filterValue: 'sand',
  },
  'sound village': {
    color: '#f6d5f6',
    imgSrc: Villages.sound,
    filterValue: 'sound',
  },
  'star village': {
    color: '#f2f2b9',
    imgSrc: Villages.star,
    filterValue: 'star',
  },
  'rock village': {
    color: '#e4c9a5',
    imgSrc: Villages.rock,
    filterValue: 'rock',
  },
  'waterfall village': {
    color: '#d5f6f1',
    imgSrc: Villages.waterfall,
    filterValue: 'waterfall',
  },
  'whirling tides village': {
    color: '#f4bd99',
    imgSrc: Villages.tides,
    filterValue: 'tides',
  },
};

