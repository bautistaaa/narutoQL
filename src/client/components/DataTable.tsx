import { FC } from 'react';
import { DataTable } from '../shared/interfaces/IDataTable';

const DataTableComponent: FC<{ data: DataTable }> = ({ data }) => {
  const { headers, body } = data;
  return (
    <table>
      <thead>
        <tr>
          {headers.map(header => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map(({ key, type, description }) => {
          return (
            <tr key={key}>
              <td>{key}</td>
              <td>{type}</td>
              <td>{description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTableComponent;
