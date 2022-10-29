import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import '@fortawesome/fontawesome-free/css/all.css';
import LogRocket from 'logrocket';
import Script from 'next/script';
import { AppProps } from 'next/app';
import '../public/css/tailwind.min.css';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
  LogRocket.init(`${process.env.NEXT_PUBLIC_LOG_ROCKET_ID}/mannueferreiracom`);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id='gtm'
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id='ga' strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
      `}
      </Script>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
