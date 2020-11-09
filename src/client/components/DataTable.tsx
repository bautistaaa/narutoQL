import { FC } from 'react';
import { IDataTable } from '../shared/interfaces/IDataTable';

const DataTable: FC<{ data: IDataTable }> = ({ data }) => {
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

export default DataTable;
