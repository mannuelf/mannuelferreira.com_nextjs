import Head from 'next/head';
import { CMS_NAME, HOME_OG_IMAGE_URL, GENERIC_META } from '@lib/constants';
import { useRouter } from 'next/router';

const Meta = () => {
  const router = useRouter();

  function renderHomeMetaTag() {
    if (router.asPath && router.asPath === '/') {
      return (
        <meta name='description' content={`${GENERIC_META} ${CMS_NAME}.`} />
      );
    }
    return '';
  }

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
        color='#2e2b55'
      />
      <link rel='manifest' href='/favicon/site.webmanifest' />
      <link rel='shortcut icon' href='/favicon/favicon-32x32.png' />
      <meta property='og:image' content={HOME_OG_IMAGE_URL} />
      <meta name='msapplication-TileColor' content='#2e2b55' />
      <meta name='msapplication-config' content='/favicon/browserconfig.xml' />
      <meta name='theme-color' content='#2e2b55' />
      {renderHomeMetaTag()}
      <link rel='alternate' type='application/rss+xml' href='/feed.xml' />
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <link
        href='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&family=Ubuntu:wght@400;500;700&Ubuntu+Mono:wght@400;700&display=swap'
        rel='stylesheet'
      />
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
