import Head from 'next/head';

import GoogleTag from '../components/GoogleTag';
import Layout from '../components/Layout';
import Nav from '../components/Nav';
import '../styles/index.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NarutoQL | Naruto GraphQL</title>
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:title" content="NarutoQL" />
        <meta property="og:description" content="Naruto GraphQL API" />
        <meta property="og:image" content="http://imgur.com/a/MuomDk0" />
      </Head>
      <GoogleTag />

      <Layout>
        <Nav />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
