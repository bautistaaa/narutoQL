import { FC } from 'react';
import characterSchema from '../../data/character-schema';
import DataTable from '../DataTable';

const CharacterSchema: FC = () => {
  return <DataTable data={characterSchema} />;
};

export default CharacterSchema;
