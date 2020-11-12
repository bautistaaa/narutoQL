import { IDataTable } from '../shared/interfaces/IDataTable';

const paginationSchema: IDataTable = {
  headers: ['Field', 'Type', 'Description'],
  body: [
    {
      key: 'count',
      type: 'Int',
      description: 'Number of records.',
    },
    {
      key: 'pages',
      type: 'Int',
      description: 'Total pages.',
    },
    {
      key: 'next',
      type: 'Int',
      description: "Number of next page. Will be null if it doesn't exist",
    },
    {
      key: 'prev',
      type: 'Int',
      description: "Number of previous page. Will be null if it doesn't exist",
    },
  ],
};

export default paginationSchema;
