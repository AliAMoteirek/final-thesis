import { Box } from '@mui/material';
import { Navigation, Pagination } from 'swiper';
import { Swiper } from 'swiper/react';
import uiNavigationSwiper from './uiNavigationSwiper';

const NavigationSwipper = ({ children }) => {
  return (
    <Box sx={{ ...uiNavigationSwiper.mainBox }}>
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={{ width: '100%', height: 'max-content' }}
      >
        {children}
      </Swiper>
    </Box>
  );
};

export default NavigationSwipper;
