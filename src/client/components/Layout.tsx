import { FC } from 'react';
import Nav from './Nav';

import styles from '../styles/Layout.module.scss';

const Layout: FC = props => (
  <div className={styles.wrapper}>
    <Nav />
    <main className={styles.main}>{props.children}</main>
  </div>
);

export default Layout;
