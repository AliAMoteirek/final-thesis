import { Box } from '@mui/material';
import { SwiperSlide } from 'swiper/react';
import AutoSwiper from '../MediaSlide/AutoSwiper';
import uiPosterSlide from './uiPosterSlide';

const PosterSlide = ({ posters }) => {
  return (
    <AutoSwiper>
      {posters.splice(0, 10).map((item, index) => (
        <SwiperSlide key={index}>
          <Box sx={{ ...uiPosterSlide.mainBox(item) }} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default PosterSlide;
