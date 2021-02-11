import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.hero}>
        <img className={styles.img} src="test.png" />
        <div className={styles.metadata}>
          <h1>
            NarutoQL<span className={styles['blinking-cursor']}>|</span>
          </h1>
          <a
            className={styles.author}
            href="https://www.twitch.com/trash_dev"
            target="_blank"
            rel="noreferrer noopener"
          >
            <img src="twitch.svg" height="20" alt="" />
            by: trash_dev
          </a>
        </div>
      </div>
    </div>
  );
}
