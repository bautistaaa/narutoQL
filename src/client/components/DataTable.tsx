import { FC } from 'react';
import { DataTable } from '../shared/interfaces/DataTable';
import styles from '../styles/DataTable.module.scss';

const DataTableComponent: FC<{ data: DataTable }> = ({ data }) => {
  const { headers, body } = data;
  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr className={styles.tr}>
          {headers.map((header) => (
            <th key={header} className={styles.th}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map(({ key, type, description }) => {
          return (
            <tr key={key} className={styles.tr}>
              <td className={styles.td}>{key}</td>
              <td className={styles.td}>{type}</td>
              <td className={styles.td}>{description}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTableComponent;
