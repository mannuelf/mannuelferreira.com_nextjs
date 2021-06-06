import Head from 'next/head';
import { CMS_NAME, HOME_OG_IMAGE_URL } from '@lib/constants';

const Meta = () => {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#28284f"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#a03e3e" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#28284F" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Mannuel Ferreira, Software Engineer. I enjoy building and designing applications for the web. I enjoy working with web technologies such as React, PHP, python, Node.JS, Sass, JavaScript. ${CMS_NAME}.`}
      />
      <link rel="stylesheet" href="https://use.typekit.net/eag6wma.css" />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
      <script src="https://kit.fontawesome.com/7843276ca8.js"></script>
    </Head>
  );
};

export default Meta;
