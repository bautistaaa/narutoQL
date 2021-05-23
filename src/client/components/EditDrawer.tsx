import ReCAPTCHA from 'react-google-recaptcha';

import {
  forwardRef,
  ForwardRefRenderFunction,
  MutableRefObject,
  useRef,
  useState,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { request, gql } from 'graphql-request';
import cx from 'classnames';

import styles from '../styles/EditDrawer.module.scss';
import { Result } from '../shared/interfaces';
import { getObjectDifferences, isEmpty } from '../shared/utils';
import Dropzone from './Dropzone';

import 'react-toastify/dist/ReactToastify.css';

const siteKey = `${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`;
export interface FileToUpload extends File {
  preview: string;
}
const RequiredMap: {
  [k: string]: { required: boolean; displayText: string };
} = {
  age: {
    required: false,
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
  {
    isOpen: boolean;
    character: Result;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ isOpen, character, setIsOpen }, ref) => {
  // @TODO: WTF?
  //const [character, setCharacter] = useState(selectedCharacter);

  //useEffect(() => {
  //setCharacter(selectedCharacter);
  //}, [selectedCharacter]);

  const recaptchaRef = useRef(null);
  const [files, setFiles] = useState<FileToUpload[]>([]);
  const uploadMutation = useMutation(() => {});
  const mutation = useMutation(
    (inc: Result) => {
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
    },
    {
      onSuccess: () => {
        toast.success('Changes submitted succesfully!');
        setIsOpen(false);
      },
    }
  );
  const { register, handleSubmit, errors } = useForm<Result>();
  const onSubmit = (newCharacter: Result) => {
    // if file exists UPLOAD to S3 and grab the URL
    // if successful submit form with avatarSrc set to new URL
    const recaptchaValue = recaptchaRef.current.getValue();
    if (recaptchaValue) {
      const diffs = getObjectDifferences(character, newCharacter);
      if (isEmpty(diffs)) {
        toast.error('No Changes');
        return;
      }
      //const payload = {
      //_id: newCharacter._id,
      //...files,
      //...diffs,
      //};
      //mutation.mutate({ ...(payload as any) });
    } else {
      toast.error('CAPTCHA failed!');
    }
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
          <div className={styles.avatars}>
            <div className={styles['original-wrapper']}>
              <img className={styles.original} src={character?.avatarSrc} />
              <label>Original</label>
            </div>
            <Dropzone reset={!isOpen} files={files} setFiles={setFiles} />
          </div>
          {Object.entries(character || {}).map((c) => {
            const [key, value] = c;
            if (key !== 'avatarSrc') {
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
            }
          })}
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={(v) => {
              console.log(v);
            }}
          />
          <button
            className={styles.cancel}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
            }}
          >
            Cancel
          </button>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
      {isOpen && <div className={styles.overlay}></div>}
      <ToastContainer />
    </>
  );
};

export default forwardRef(EditDrawer);
