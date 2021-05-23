import { DataTable } from '../shared/interfaces/DataTable';

const characterSchema: DataTable = {
  headers: ['Field', 'Type', 'Description'],
  body: [
    {
      key: 'age',
      type: 'String',
      description: 'Age of character',
    },
    {
      key: 'avatarSrc',
      type: 'String',
      description: 'URL for avatar image.',
    },
    {
      key: 'description',
      type: 'String',
      description: 'Brief description about character.',
    },
    {
      key: 'firstAnimeAppearance',
      type: 'String',
      description: 'First anime appearance of character.',
    },
    {
      key: 'firstMangaAppearance',
      type: 'String',
      description: 'First manga appearance of character.',
    },
    {
      key: '_id',
      type: 'ID',
      description:
        'ID of character, helpful when trying to query individual character.',
    },
    {
      key: 'name',
      type: 'String',
      description: 'Name of character.',
    },
    {
      key: 'nameMeaning',
      type: 'String',
      description: 'Meaning of characters name. Super deep stuff.',
    },
    {
      key: 'notableFeatures',
      type: 'String',
      description: 'Noteable features of character.',
    },
    {
      key: 'rank',
      type: 'String',
      description: 'Rank of character (ex: chuunin/jounin)',
    },
    {
      key: 'village',
      type: 'String',
      description: 'Village of character.',
    },
  ],
};

export default characterSchema;
