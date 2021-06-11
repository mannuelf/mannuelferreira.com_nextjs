import Head from 'next/head';
import { CMS_NAME, HOME_OG_IMAGE_URL } from '@lib/constants';

const Meta = () => {
  return (
    <Head>
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicon/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon/favicon-16x16.png'
      />
      <link
        rel='mask-icon'
        href='/favicon/safari-pinned-tab.svg'
        color='#28284f'
      />
      <link rel='manifest' href='/favicon/site.webmanifest' />
      <link rel='shortcut icon' href='/favicon/favicon.ico' />
      <meta property='og:image' content={HOME_OG_IMAGE_URL} />
      <meta name='msapplication-TileColor' content='#a03e3e' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#28284F' />
      <meta
        name='description'
        content={`Mannuel Ferreira, Software Engineer. I enjoy building and designing applications for the web. I enjoy working with web technologies such as React, PHP, python, Node.JS, Sass, JavaScript. ${CMS_NAME}.`}
      />
      <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&family=Ubuntu:wght@400;500;700&Ubuntu+Mono:wght@400;700&display=swap'
        rel='stylesheet'
      />
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </Head>
  );
};

export default Meta;
