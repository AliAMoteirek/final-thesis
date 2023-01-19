import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import NavigationSwipper from '../NavigationSwipper/NavigationSwipper';
import uiBackdropSlide from './uiBackdropSlide';

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwipper>
      {[...backdrops].splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box sx={{ ...uiBackdropSlide.mainBox(item) }} />
        </SwiperSlide>
      ))}
    </NavigationSwipper>
  );
};

export default BackdropSlide;
