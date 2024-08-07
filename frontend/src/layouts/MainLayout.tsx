import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayouts = () => {
  return (
    <>
      <Header />
      <div className="mainlayout">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayouts;
