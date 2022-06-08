import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  useCartActions,
  useLocalStorage,
  useReset,
  useTypedSelector,
  useUserActions,
} from '../hooks';
import { useEffect } from 'react';

const MainLayout: React.FC = ({ children }) => {
  useReset();

  const accessToken = useLocalStorage('', 'accessToken');

  const { getCurrentUser } = useUserActions();
  const { data: cartData } = useTypedSelector(state => state.cart);
  const { getCart } = useCartActions();

  useEffect(() => {
    if (cartData.cartItems.length < 1) {
      getCart();
    }
  }, [getCart, cartData]);

  useEffect(() => {
    if (accessToken.length > 0) {
      getCurrentUser(accessToken);
    }
  }, [accessToken, getCurrentUser]);

  return (
    <div className="app__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
