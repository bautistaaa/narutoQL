import { FC } from 'react';
import villageSchema from '../../data/village-schema';
import DataTable from '../DataTable';

const VillageSchema: FC = () => {
  return <DataTable data={villageSchema} />;
};

export default VillageSchema;
