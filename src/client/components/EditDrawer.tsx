import { forwardRef, ForwardRefRenderFunction, MutableRefObject } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { request, gql } from 'graphql-request';
import cx from 'classnames';

import styles from '../styles/EditDrawer.module.scss';
import { Result } from '../shared/interfaces';
import { getObjectDifferences } from '../shared/utils';

const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`;
const RequiredMap: {
  [k: string]: { required: boolean; displayText: string };
} = {
  age: {
    required: true,
    displayText: 'Age',
  },
  avatarSrc: {
    required: true,
    displayText: 'Avatar Src',
  },
  description: {
    required: true,
    displayText: 'Description',
  },
  firstAnimeAppearance: {
    required: false,
    displayText: 'First Anime Appearance',
  },
  firstMangaAppearance: {
    required: false,
    displayText: 'First Manga Appearance',
  },
  name: {
    required: true,
    displayText: 'Name',
  },
  nameMeaning: {
    required: false,
    displayText: 'Name Meaning',
  },
  notableQuotes: {
    required: false,
    displayText: 'Notable Quotes',
  },
  rank: {
    required: true,
    displayText: 'Rank',
  },
  village: {
    required: true,
    displayText: 'Village',
  },
};

const EditDrawer: ForwardRefRenderFunction<
  MutableRefObject<HTMLDivElement>,
  { isOpen: boolean; character: Result }
> = ({ isOpen, character }, ref) => {
  // @TODO: WTF?
  //const [character, setCharacter] = useState(selectedCharacter);

  //useEffect(() => {
  //setCharacter(selectedCharacter);
  //}, [selectedCharacter]);

  const mutation = useMutation((inc: Result) => {
    console.log(inc);
    const { age, notableQuotes, ...datas } = inc;
    const input = {
      data: {
        age: +age,
        ...(notableQuotes
          ? { notableQuotes: notableQuotes.replace(/"/g, '\\"') }
          : {}),
        ...datas,
      },
    };
    return request(
      endpoint,
      gql`
        mutation Update($data: UpdateCharacterInput!) {
          updateCharacter(data: $data) {
            age
          }
        }
      `,
      input
    );
  });
  const { register, handleSubmit, errors } = useForm<Result>();
  const onSubmit = (newCharacter: Result) => {
    const diffs = {
      _id: newCharacter._id,
      ...getObjectDifferences(character, newCharacter),
    };
    mutation.mutate({ ...(diffs as any) });
  };
  const wrapperClass = cx([
    styles.wrapper,
    {
      [styles['wrapper-open']]: isOpen,
    },
  ]);

  return (
    <>
      <div ref={ref as any} className={wrapperClass}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(character || {}).map((c) => {
            const [key, value] = c;
            return (
              <div
                key={key}
                className={styles.input}
                style={{ display: key === '_id' ? 'none' : 'block' }}
              >
                <label>{RequiredMap[key]?.displayText}</label>
                <input
                  key={key}
                  name={key}
                  defaultValue={value}
                  ref={register({ required: RequiredMap[key]?.required })}
                />
              </div>
            );
          })}
          {errors.name && <span>This field is required</span>}
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
      {isOpen && <div className={styles.overlay}></div>}
    </>
  );
};

export default forwardRef(EditDrawer);
