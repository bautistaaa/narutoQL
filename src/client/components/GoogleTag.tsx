import Head from 'next/head'

const GoogleTag = () => {
  return (
    <Head>
      <script async key="gtag" src={`https://www.googletagmanager.com/gtag/js?id=G-74K4M0X39S`} />
      <script
        key="gtag.js"
        dangerouslySetInnerHTML={{
          __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-74K4M0X39S');
              `,
        }}
      />
    </Head>
  )
}

export default GoogleTag

