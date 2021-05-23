import { FC } from 'react';

import styles from '../styles/Card.module.scss';
import { Result } from '../shared/interfaces';
import { VILLAGE_MAP } from '../shared/constants/village';

const Card: FC<{
  result: Result;
}> = ({ children, result }) => {
  const { village } = result;
  const color = VILLAGE_MAP[village]?.color;

  return (
    <>
      <div className={styles.card} style={{ background: color }}>
        {children}
      </div>
    </>
  );
};

export default Card;
