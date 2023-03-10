import PiwikPro from '@piwikpro/react-piwik-pro';
import { Analytics } from '@vercel/analytics/react';
import LogRocket from 'logrocket';
import { AppProps } from 'next/app';
import Script from 'next/script';
import '../public/css/tailwind.min.css';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
  LogRocket.init(`${process.env.NEXT_PUBLIC_LOG_ROCKET_ID}/mannueferreiracom`);
  PiwikPro.initialize(`${process.env.NEXT_PUBLIC_PIWIK_PRO}`, `${process.env.NEXT_PUBLIC_PIWIK_PRO_LINK}`);
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
