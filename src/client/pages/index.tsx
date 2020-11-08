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
          <div className={styles.author}>by: trash_dev</div>
        </div>
      </div>
    </div>
  );
}
