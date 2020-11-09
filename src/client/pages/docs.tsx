import { FC, useEffect, useState } from 'react';
import cx from 'classnames';

import SideBar from '../components/Sidebar';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/Docs.module.scss';
import ClanSchema from '../components/documentation/ClanSchema';
import CharacterSchema from '../components/documentation/CharacterSchema';
import CharacterSingle from '../components/documentation/CharacterSingle';
import CharacterAll from '../components/documentation/CharacterAll';
import CharacterFilter from '../components/documentation/CharacterFilter';

const Toggle: FC<{ handleClick: Function }> = props => {
  const { handleClick: callback } = props;
  const [isClicked, setIsClicked] = useState(false);
  const buttonClass = cx([
    styles.button,
    {
      [styles['button-spin']]: isClicked,
    },
  ]);
  const handleClick = () => {
    setIsClicked(true);
    callback();
  };

  return (
    <button
      className={buttonClass}
      onClick={handleClick}
      onAnimationEnd={() => setIsClicked(false)}
    >
      <img src="sharingan.svg" />
    </button>
  );
};

const Docs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const isDesktop = width >= 768;
  const articleClass = cx([
    styles.article,
    {
      [styles['article-shrink']]: isDesktop && isOpen,
    },
  ]);

  useEffect(() => {
    if (isDesktop) {
      setIsOpen(true);
    } else if (!isDesktop) {
      setIsOpen(false);
    }
  }, [width]);

  return (
    <div className={styles.wrapper}>
      <SideBar
        isVisible={isOpen}
        toggle={() => setIsOpen(false)}
        isDesktop={isDesktop}
      />
      <Toggle handleClick={() => setIsOpen(!isOpen)} />
      <article className={articleClass}>
        <div className={styles.anchor} id="introduction" />
        <h2>Introduction</h2>
        <p>
          Not sure how you ended up here? Cool, either are we but there is a
          strong assumption you are interested in graphQL or anime. Use this
          documentation to help you get the most out of the{' '}
          <strong>NarutoQL API.</strong>
        </p>

        <div className={styles.anchor} id="character" />
        <h2>Character</h2>
        <p>
          One of the more interesting data points of the API. Characters are
          sorted by name.
        </p>

        <div className={styles.anchor} id="character-schema" />
        <h3>Character Schema</h3>
        <p>
          <CharacterSchema />
        </p>

        <div className={styles.anchor} id="single-character" />
        <h3>Get Single Character</h3>
        <p>
          <CharacterSingle />
        </p>

        <div className={styles.anchor} id="all-characters" />
        <h3>Get All Characters</h3>
        <p>
          <CharacterAll />
        </p>

        <div className={styles.anchor} id="filter-characters" />
        <h3>Filter Characters</h3>
        <p>
          <CharacterFilter />
        </p>

        <div className={styles.anchor} id="clan" />
        <h2>Clan</h2>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="clan-schema" />
        <h3>Clan Schema</h3>
        <ClanSchema />

        <div className={styles.anchor} id="single-clan" />
        <h3>Get Single Clan</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="all-clans" />
        <h3>Get All Clans</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="filter-clans" />
        <h3>Filter Clans</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="village" />
        <h2>Village</h2>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="village-schema" />
        <h3>Village Schema</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="single-schema" />
        <h3>Get Single Village</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="all-villages" />
        <h3>Get All Village</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>
      </article>
    </div>
  );
};

export default Docs;
