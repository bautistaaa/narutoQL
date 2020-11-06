import Layout from '../components/Layout';
import Nav from '../components/Nav';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Nav />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
