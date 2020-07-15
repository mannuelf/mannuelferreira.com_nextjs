import React from 'react';
import { AppInitialProps, AppContext } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from 'redux/store';
import withRedux from 'next-redux-wrapper';
import 'shared/tailwind.generated.css';

export async function getInitialProps({ Component, ctx }: AppContext) {
  // Keep in mind that this will be called twice on server, one for page and second for error page
  ctx.store.dispatch({ type: 'GET_BLOG_POSTS', payload: 'was set in _app' });

  return {
    pageProps: {
      // Call page-level getInitialProps
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
      // Some custom thing for all pages
      appProp: ctx.pathname,
    },
  };
}

function App({ Component, pageProps }: AppInitialProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App); // withRedux wrapper passes the store to the App component
