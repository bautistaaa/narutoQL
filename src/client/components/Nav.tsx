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
          <li>
            <Link href="/explorer">
              <span className={[styles.explore, styles.item].join(' ')}>
                Explore
              </span>
            </Link>
          </li>
          <li>
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
