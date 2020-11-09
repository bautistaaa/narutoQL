import { FC } from 'react';
import cx from 'classnames';

import { sections } from '../data/sections';
import styles from '../styles/Sidebar.module.scss';

const SideBar: FC<{
  isDesktop: boolean;
  isVisible: boolean;
  toggle: Function;
}> = props => {
  const { isDesktop, isVisible, toggle } = props;
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
  const handleClick = () => {
    if (!isDesktop) {
      toggle();
    }
  };

  return (
    <div className={wrapperClass}>
      <nav className={navClass}>
        <ul className={styles.list}>
          {sections.map(section => {
            const { id, text, items } = section;

            return (
              <li key={id} className={styles.section}>
                <a
                  onClick={handleClick}
                  className={styles.header}
                  href={`#${id}`}
                >
                  {text}
                </a>
                <ul>
                  {items.map(item => {
                    const { id, text } = item;
                    return (
                      <li key={id} className={styles.item}>
                        <a onClick={handleClick} href={`#${id}`}>
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
