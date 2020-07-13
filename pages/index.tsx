import Head from 'next/head';
import { config } from 'dotenv';
import { GlobalStyle } from 'shared/GlobalStyle';
import addScript from 'customHooks/addScript';
import Header from 'components/AppHeader/AppHeader';
import Footer from 'components/AppFooter/AppFooter';
import HomeWelcome from 'components/Home/home';
import About from 'components/About/about';
import ArticlesList from 'components/Articles/ArticlesList';

export default function Home() {
  addScript('https://kit.fontawesome.com/7843276ca8.js');
  return (
    <>
      <GlobalStyle />
      <Head>
        <meta charSet="utf-8" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@manidf" />
        <meta name="twitter:creator" content="@manidf" />
        <meta name="twitter:title" content="Mannuel Ferreira" />
        <meta name="twitter:description" content="Mannuel Ferreira." />
        <meta
          name="twitter:image"
          content={`https://themwebs.me/myzite/wp-content/uploads/2019/04/mannuel_ferreira_web.jpg`}
        />
        <meta property="og:url" content="https://mannuelferreira.com" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Mannuel Ferreira" />
        <meta property="og:description" content="Mannuel Ferreira" />
        <meta
          property="og:image"
          content={`https://themwebs.me/myzite/wp-content/uploads/2019/04/mannuel_ferreira_web.jpg`}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="theme-color" content="#28284F" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#28284f" />
        <meta name="msapplication-TileColor" content="#28284f" />
        <meta
          name="google-site-verification"
          content="25AFBsBlZv3w387GNKyj0bNBhCjZxdf83TzzBi6X1po"
        />
        <meta
          name="description"
          content="Mannuel Ferreira, Software Engineer. I enjoy building and designing applications for the web. I enjoy working with web technologies such as PHP, python, Node.js, Sass (Sass syntax), JavaScript"
        />
        <link rel="apple-touch-icon" href="/logo192.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="https://use.typekit.net/eag6wma.css" />
        <title>Mannuel Ferreira</title>
      </Head>

      <Header />
      <HomeWelcome />

      <Footer />
    </>
  );
}
