import '../styles/index.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}

export default MyApp;
