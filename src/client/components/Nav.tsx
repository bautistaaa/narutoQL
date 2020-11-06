import Link from 'next/link';

import styles from '../styles/Nav.module.scss';

const Nav = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/">
          <img src="brand2.svg" className={styles.brand} />
        </Link>
        <ul>
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
