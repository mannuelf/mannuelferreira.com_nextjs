import Document, { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name="google-site-verification" content="25AFBsBlZv3w387GNKyj0bNBhCjZxdf83TzzBi6X1po" />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;500&family=Ubuntu:wght@300;400;500;700&Ubuntu+Mono:wght@300;400;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            async
            id='gtm'
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            strategy='afterInteractive'
          />
        </body>
      </Html>
    );
  }
}
