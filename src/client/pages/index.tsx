import Head from 'next/head';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>NarutoQL | Naruto GraphQL</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.links}>
          <ul>
            <li>Docs</li>
          </ul>
        </div>
      </nav>

      <main className={styles.main}>
        <div className={styles.hero}>
          <img className={styles.character} src="test.png" />
          <h1>NarutoQL</h1>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
