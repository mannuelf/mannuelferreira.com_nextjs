import ReactGA from 'react-ga4';
export const pageview = (url: string) => {
  if (typeof window !== 'undefined') {
    ReactGA.initialize(`${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`);
    ReactGA.send({ hitType: 'pageview', page: `${url}` });
  }
};

export const event = ({ action, params }: Ga) => {
  if (typeof window !== 'undefined') {
    window.gtag('event', action, params);
  }
};
