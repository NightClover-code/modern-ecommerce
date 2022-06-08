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
  const { data } = useTypedSelector(state => state.user);
  const { getCart } = useCartActions();

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (accessToken.length > 0 && !data) {
      getCurrentUser(accessToken);
    }
  }, [accessToken, getCurrentUser, data]);

  return (
    <div className="app__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
