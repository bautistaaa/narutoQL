import { FC } from 'react';
import truncateString from '../shared/utils/truncateString';
import Badge from './Badge';

import styles from '../styles/Card.module.scss';
import { Result } from '../shared/interfaces';
import { VILLAGE_MAP } from '../shared/constants/village';

const Card: FC<{
  result: Result;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCharacter: React.Dispatch<
    React.SetStateAction<Result | undefined>
  >;
}> = ({ result, setIsDrawerOpen, setSelectedCharacter }) => {
  const { village, rank, name, description, avatarSrc, age } = result;
  const color = VILLAGE_MAP[village]?.color;

  return (
    <>
      <div className={styles.card} style={{ background: color }}>
        <div
          className={styles.edit}
          onClick={() => {
            setIsDrawerOpen(true);
            setSelectedCharacter(result);
          }}
        >
          <img src="more.svg" />
        </div>

        <div className={styles.avatar}>
          <img loading="lazy" src={avatarSrc} alt={name} />
          <Badge village={village} />
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
    </>
  );
};

export default Card;
