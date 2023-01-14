import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import AuthModal from '../common/AuthModal/AuthModal';
import Footer from '../common/Footer';
import GlobalLoading from '../common/GlobalLoading';
import Header from '../common/Header/Header';
import { setListFavorites, setUser } from '../../redux/features/userSlice';
import userApi from '../../api/modules/userApi';
import { toast } from 'react-toastify';
import favoriteApi from '../../api/modules/favoriteApi';

const MainLayout = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, error } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (error) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFavorites = async () => {
      const { response, error } = await favoriteApi.getList();

      if (response) dispatch(setListFavorites(response));
      if (error) toast.error(error.message);
    };

    if (user) getFavorites();
    if (!user) dispatch(setListFavorites([]));
  }, [dispatch, user]);

  return (
    <>
      {/* globalloading */}
      <GlobalLoading />
      {/* globalloading */}

      {/* login modal */}
      <AuthModal />
      {/* login modal */}

      <Box display="flex" minHeight="100vh">
        {/* header */}
        <Header />
        {/* header */}

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
        {/* main */}
      </Box>

      {/* footer */}
      <Footer />
      {/* footer */}
    </>
  );
};

export default MainLayout;
