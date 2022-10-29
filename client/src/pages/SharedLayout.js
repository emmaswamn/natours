import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Alert  from '../components/Alert';
import { useSelector } from "react-redux";

const SharedLayout = () => {
  const {isShow} = useSelector((store) => store.alert);
  return (
    <>
      {isShow && <Alert />}
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};
export default SharedLayout;
