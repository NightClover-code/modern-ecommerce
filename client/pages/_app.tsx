import '../styles/index.css';
import '../styles/bootstrap.min.css';
import type { AppProps } from 'next/app';
import MainLayout from '../layouts/MainLayout';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { useStore } from '../state';

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <MainLayout>
        <Container>
          <Component {...pageProps} />
        </Container>
      </MainLayout>
    </Provider>
  );
}

export default MyApp;
