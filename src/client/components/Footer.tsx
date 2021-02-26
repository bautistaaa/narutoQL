import Link from 'next/link';
import { FC } from 'react';

import styles from '../styles/Footer.module.scss';

const Footer: FC = () => {
  return (
    <div className={styles.footer}>
      Want to contribute? Click{' '}
      <Link href="/contribute">
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>here</span>
      </Link>
      !
    </div>
  );
};

export default Footer;
