import React, { FC, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import Link from 'next/link';
import Cookies from 'js-cookie';

import LoginForm from './LoginForm';
import styles from '../styles/Nav.module.scss';
import { useAppContext } from '../shared/AppContext';
import useClickOutside from '../hooks/useClickOutside';

const Nav: FC = () => {
  const modalRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAppContext();

  useClickOutside(modalRef, () => {
    setIsModalOpen(false);
  });

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
            {isLoggedIn ? (
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  Cookies.remove('jwt');
                }}
                className={styles.login}
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                className={styles.login}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </nav>
      <Modal
        contentRef={(node) => (modalRef.current = node as any)}
        isOpen={isModalOpen}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <button
          onClick={() => {
            setIsModalOpen(false);
          }}
          className={styles.close}
        >
          <img src="cancel.svg" />
        </button>
        <LoginForm setIsModalOpen={setIsModalOpen} />
      </Modal>
    </header>
  );
};

export default Nav;
