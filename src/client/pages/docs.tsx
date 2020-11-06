import { FC, useState } from 'react';
import SideBar from '../components/Sidebar';
import useWindowSize from '../hooks/useWindowSize';
import styles from '../styles/Docs.module.scss';

const Toggle: FC<{ handleClick: Function }> = props => {
  const { handleClick } = props;
  return (
    <button className={styles.button} onClick={() => handleClick()}>
      <img src="sharingan.svg" />
    </button>
  );
};

const Docs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { width } = useWindowSize();
  const isDesktop = width >= 768;

  return (
    <div className={styles.wrapper}>
      <SideBar
        isVisible={isDesktop ? true : isOpen}
        toggle={() => setIsOpen(false)}
      />
      {!isDesktop && <Toggle handleClick={() => setIsOpen(!isOpen)} />}
      <article className={styles.article}>
        <div className={styles.anchor} id="introduction" />
        <h3>Introduction</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="graphql" />
        <h3>GraphQL</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="character" />
        <h3>Character</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="character-schema" />
        <h3>Character Schema</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="single-character" />
        <h3>Get Single Character</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="all-characters" />
        <h3>Get All Characters</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="filter-characters" />
        <h3>Filter Characters</h3>
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

        <div className={styles.anchor} id="clan" />
        <h3>Clan</h3>
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
        <p>
          Now that we know who you are, I know who I am. I'm not a mistake! It
          all makes sense! In a comic, you know how you can tell who the
          arch-villain's going to be? He's the exact opposite of the hero. And
          most times they're friends, like you and me! I should've known way
          back when... You know why, David? Because of the kids. They called me
          Mr Glass.
        </p>

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
        <h3>Village</h3>
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
