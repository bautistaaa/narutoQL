import { IDataTable } from '../shared/interfaces/IDataTable';

const characterSchema: IDataTable = {
  headers: ['Field', 'Type', 'Description'],
  body: [
    {
      key: 'avatarSrc',
      type: 'String',
      description: 'URL for avatar image.',
    },
    {
      key: 'description',
      type: 'String',
      description: 'Brief description about clan.',
    },
    {
      key: '_id',
      type: 'ID',
      description:
        'ID of clan, helpful when trying to query individual clan.',
    },
    {
      key: 'name',
      type: 'String',
      description:
        'Name of clan.',
    },
    {
      key: 'signatureAbilities',
      type: 'String',
      description: 'Clan abilities that make them unique.',
    },
    {
      key: 'village',
      type: 'String',
      description: 'Village of clan.',
    },
  ],
};

export default characterSchema;
