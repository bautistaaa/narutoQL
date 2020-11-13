import Link from 'next/link';
import { FC } from 'react';

import styles from '../styles/Nav.module.scss';

const Nav: FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <img src="brand2.svg" className={styles.brand} />
        </Link>
        <ul className={styles.links}>
          <li>
            <a target="_blank" href="/graphql" className={styles.item}>
              Play
            </a>
          </li>
          <li>
            <Link href="/docs">
              <a className={styles.item}>Docs</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
