import React, { FC } from 'react';
import paginationSchema from '../../data/pagination-schema';
import DataTable from '../DataTable';
import PaginationSnippet from './PaginationSnippet';

const PaginationSchema: FC = () => {
  return (
    <div>
      <DataTable data={paginationSchema} />
      <PaginationSnippet />
    </div>
  );
};

export default PaginationSchema;
