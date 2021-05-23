import { gql, request } from 'graphql-request';
import { FC } from 'react';
import Cookie from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import styles from '../styles/LoginForm.module.scss';
import { useAppContext } from '../shared/AppContext';

const endpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`;
const LoginForm: FC<{
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setIsModalOpen }) => {
  const { setIsLoggedIn } = useAppContext();
  const { register, handleSubmit } = useForm<any>();
  const mutation = useMutation(
    (loginInfo: any) => {
      const input = {
        data: {
          ...loginInfo,
        },
      };
      return request(
        endpoint,
        gql`
          mutation Login($data: LoginInput!) {
            login(data: $data)
          }
        `,
        input
      );
    },
    {
      onSuccess: (a) => {
        toast.success('Changes submitted succesfully!');
        Cookie.set('jwt', a.login);
        setIsModalOpen(false);
        setIsLoggedIn(true);
      },
      onError: () => {
        toast.error('Invalid Credentials');
      },
    }
  );
  const onSubmit = (input: any) => {
    mutation.mutate({ ...(input as any) });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <label>Email</label>
        <input name="email" type="email" ref={register({ required: true })} />
      </div>
      <div className={styles.field}>
        <label>Password</label>
        <input
          name="password"
          type="password"
          ref={register({ required: true })}
        />
      </div>
      <button type="submit" className={styles.submit}>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
