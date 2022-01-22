//importing styles
import '../styles/index.css';
import '../styles/bootstrap.min.css';
//importing utils
import { useStore } from '../state';
import type { AppProps } from 'next/app';
//importing components
import MainLayout from '../layouts/MainLayout';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [storageItems, setStorageItems] = useState([]);

  useEffect(() => {
    const cartItemsFromStorage = localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems')!)
      : [];

    setStorageItems(cartItemsFromStorage);
  }, []);

  const initialState = {
    cart: { cartItems: storageItems },
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
