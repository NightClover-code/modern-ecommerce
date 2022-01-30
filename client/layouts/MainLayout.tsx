//importing components
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useUserActions } from '../hooks';
import { useEffect } from 'react';

//main layout
const MainLayout: React.FC = ({ children }) => {
  const { getCurrentUser } = useUserActions();

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return (
    <div className="app__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
