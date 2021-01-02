import { DataTable } from '../shared/interfaces/IDataTable';

const villageSchema: DataTable = {
  headers: ['Field', 'Type', 'Description'],
  body: [
    {
      key: '_id',
      type: 'ID',
      description:
        'ID of village, helpful when trying to query individual village.',
    },
    {
      key: 'name',
      type: 'String',
      description: 'Name of village.',
    },
  ],
};

export default villageSchema;
