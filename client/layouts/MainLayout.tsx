//importing components
import Header from '../components/Header';
import Footer from '../components/Footer';

//main layout
const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="app__container">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
