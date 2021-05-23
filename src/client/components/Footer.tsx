import Link from 'next/link';
import { FC } from 'react';

import styles from '../styles/Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.left}>
        Want to contribute? Click{' '}
        <Link href="/contribute">
          <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            here
          </span>
        </Link>
        !
      </div>
      <div className={styles.right}>
        <a
          href="https://github.com/bautistaaa/narutoQL"
          target="_blank"
          className={styles.item}
        >
          <img
            src="github.svg"
            className={styles.github}
            height="30"
            width="30"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
