import { AppProps } from 'next/App';
import 'shared/tailwind.generated.css';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
