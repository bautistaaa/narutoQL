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
import ClanSingle from '../components/documentation/ClanSingle';
import ClanAll from '../components/documentation/ClanAll';
import ClanFilter from '../components/documentation/ClanFilter';
import VillageSchema from '../components/documentation/VillageSchema';
import VillageSingle from '../components/documentation/VillageSingle';
import VillageAll from '../components/documentation/VillageAll';
import PaginationSchema from '../components/documentation/PaginationSchema';

const Toggle: FC<{ handleClick: Function }> = (props) => {
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

/**
 *I honestly dont give a shit how ugly this is..
 */
const Docs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const isDesktop = width >= 768;
  const articleClass = cx([styles.article]);
  const innerClass = cx([
    styles.inner,
    {
      [styles['inner-shrink']]: isDesktop && isOpen,
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
      <div className={innerClass}>
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
          <p>
            You can query the api at{' '}
            <code className="code-text">www.narutoql.com/graphql</code>
          </p>
          <h3>Contribute</h3>
          <p>
            This could definitely use some improvements. Feel free to fork the
            repo{' '}
            <a href="https://github.com/bautistaaa/narutoQL" target="_blank">
              <strong>here</strong>
            </a>
          </p>

          <div className={styles.anchor} id="info" />
          <h2>Info</h2>
          <p>
            Use the <code className="code-text">Info</code> type to get the
            metadata you need for total count and pagination. All types have an{' '}
            <code className="code-text">Info</code> type on them.
          </p>
          <h3>Info Schema</h3>
          <PaginationSchema />

          <div className={styles.anchor} id="character" />
          <h2>Character</h2>
          <p>
            One of the more interesting data points of the API. Characters are
            sorted by name.
          </p>

          <div className={styles.anchor} id="character-schema" />
          <h3>Character Schema</h3>
          <CharacterSchema />
          <div className={styles.anchor} id="single-character" />
          <h3>Get Single Character</h3>
          <CharacterSingle />

          <div className={styles.anchor} id="all-characters" />
          <h3>Get All Characters</h3>
          <CharacterAll />

          <div className={styles.anchor} id="filter-characters" />
          <h3>Filter Characters</h3>
          <CharacterFilter />

          <div className={styles.anchor} id="clan" />
          <h2>Clan</h2>
          <p>Clan info and things...</p>

          <div className={styles.anchor} id="clan-schema" />
          <h3>Clan Schema</h3>
          <ClanSchema />

          <div className={styles.anchor} id="single-clan" />
          <h3>Get Single Clan</h3>
          <ClanSingle />

          <div className={styles.anchor} id="all-clans" />
          <h3>Get All Clans</h3>
          <ClanAll />

          <div className={styles.anchor} id="filter-clans" />
          <h3>Filter Clans</h3>
          <ClanFilter />

          <div className={styles.anchor} id="village" />
          <h2>Village</h2>
          <p>Village things!</p>

          <div className={styles.anchor} id="village-schema" />
          <h3>Village Schema</h3>
          <VillageSchema />

          <div className={styles.anchor} id="single-schema" />
          <h3>Get Single Village</h3>
          <VillageSingle />

          <div className={styles.anchor} id="all-villages" />
          <h3>Get All Villages</h3>
          <VillageAll />
        </article>
      </div>
    </div>
  );
};

export default Docs;
