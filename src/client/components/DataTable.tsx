import { FC } from 'react';
import { IDataTable } from '../shared/interfaces/IDataTable';

const DataTable: FC<{ data: IDataTable }> = ({ data }) => {
  const { headers, body } = data;
  return (
    <table>
      <thead>
        {headers.map(header => (
          <th>{header}</th>
        ))}
      </thead>
      <tbody>
        {body.map(({ key, type, description }) => {
          return (
            <tr>
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
