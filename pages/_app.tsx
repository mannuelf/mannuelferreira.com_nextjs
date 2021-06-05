import { useState } from 'react';
import { AppProps } from 'next/app';
import LogRocket from 'logrocket';
import ReactGa from 'react-ga';
import { ThemeProvider } from 'styled-components';
import '@shared/tailwind.generated.css';
import { lightTheme, darkTheme, GlobalStyle } from '../shared/GlobalStyle';
require('dotenv').config();

if (typeof window !== 'undefined') {
  LogRocket.init(`${process.env.REACT_APP_LOG_ROCKET_ID}/mannueferreiracom`);
  ReactGa.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS}`);
  ReactGa.pageview(window.location.pathname + window.location.search);
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
