//importing styles
import '../styles/index.css';
import '../styles/bootstrap.min.css';
//importing utils
import { useStore } from '../state';
import { useLocalStorage } from '../hooks';
import type { AppProps } from 'next/app';
//importing components
import MainLayout from '../layouts/MainLayout';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  const [cartItems] = useLocalStorage([], 'cartItems');

  const initialState = {
    cart: { cartItems },
    ...pageProps.initialReduxState,
  };

  const store = useStore(initialState);

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
