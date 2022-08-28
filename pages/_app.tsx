import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import '../public/css/tailwind.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import * as ga from '@lib/ga';
import LogRocket from 'logrocket';

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'development') {
  LogRocket.init(`${process.env.NEXT_PUBLIC_LOG_ROCKET_ID}/mannueferreiracom`);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      ga.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return <Component {...pageProps} />;
}
