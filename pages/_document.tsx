import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='msvalidate.01' content='D37242BCFEACCD5D06A16A1748BF7DA1' />
          <meta
            name='google-site-verification'
            content='25AFBsBlZv3w387GNKyj0bNBhCjZxdf83TzzBi6X1po'
          />
          <link rel='preconnect' href='https://fonts.gstatic.com' />
          <link
            href='https://fonts.googleapis.com/css2?family=family=Ubuntu:wght@300;400;500;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
