import Link from "next/link";
import { FC } from "react";

import styles from "../styles/Contribute.module.scss";

const Contribute: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.blurb}>
        <h3 className={styles.header}>
          Contributions are always welcome to this project.
        </h3>
        <p>
          Feel free to fork the repo on{" "}
          <a href="https://github.com/bautistaaa/narutoQL" target="_blank">
            <span className={styles.attention}>Github</span>
          </a>
        </p>
        <p>OR</p>
        <p>
          Submit character revisions in the{" "}
          <Link href="/explorer">
            <span className={styles.explore}>explorer</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Contribute;
