import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../common/Footer';
import GlobalLoading from '../common/GlobalLoading';
import Header from '../common/Header';

const MainLayout = () => {
  return (
    <>
      {/* globalloading */}
      <GlobalLoading />
      {/* globalloading */}

      {/* login modal */}
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
