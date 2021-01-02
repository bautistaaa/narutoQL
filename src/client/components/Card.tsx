import { FC } from 'react';
import truncateString from '../shared/utils/truncateString';
import Badge from './Badge';

import styles from '../styles/Card.module.scss';
import { Result } from '../shared/interfaces';
import { VILLAGE_MAP } from '../shared/constants/village';

const Card: FC<{ result: Result }> = ({ result }) => {
  const { village, rank, name, description, avatarSrc, age } = result;
  const color = VILLAGE_MAP[village]?.color;

  return (
    <div className={styles.card} style={{ background: color }}>
      <Badge village={village} />
      <div className={styles.avatar}>
        <img loading="lazy" src={avatarSrc} alt={name} />
      </div>
      <p>
        <span className={styles.label}>Name:</span> {name}
      </p>
      <p>
        <span className={styles.label}>Village:</span>{' '}
        <span className={styles.capitalize}>{village || '?'}</span>
      </p>
      <p>
        <span className={styles.label}>Age:</span> {age || '?'}
      </p>
      <p>
        <span className={styles.label}>Rank:</span> {rank || '?'}
      </p>
      <p>
        <span className={styles.label}>Description:</span>{' '}
        {truncateString(description, 100) || '?'}
      </p>
    </div>
  );
};

export default Card;
