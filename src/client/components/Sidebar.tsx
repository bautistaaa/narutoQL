import { FC } from 'react';
import cx from 'classnames';

import { sections } from '../data/sections';
import styles from '../styles/Sidebar.module.scss';

const SideBar: FC<{ isVisible: boolean; toggle: Function }> = props => {
  const { isVisible, toggle } = props;
  const wrapperClass = cx([
    styles.wrapper,
    {
      [styles['wrapper-hidden']]: !isVisible,
    },
  ]);
  const navClass = cx([
    styles.nav,
    {
      [styles['nav-hidden']]: !isVisible,
    },
  ]);

  return (
    <div className={wrapperClass}>
      <nav className={navClass}>
        <ul className={styles.list}>
          {sections.map(section => {
            const { id, text, items } = section;

            return (
              <li className={styles.section}>
                <a
                  onClick={() => toggle()}
                  className={styles.header}
                  href={`#${id}`}
                >
                  {text}
                </a>
                <ul>
                  {items.map(item => {
                    const { id, text } = item;
                    return (
                      <li className={styles.item}>
                        <a onClick={() => toggle()} href={`#${id}`}>
                          {text}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
