import { FC } from 'react';
import { VILLAGE_MAP } from '../shared/constants/village';
import styles from '../styles/Badge.module.scss';

const Badge: FC<{ village: string }> = ({ village }) => {
  const path = VILLAGE_MAP[village]?.imgSrc ?? 'unknown.svg';
  return (
    <div className={styles.badge}>
      <img src={path} />
    </div>
  );
};

export default Badge;
