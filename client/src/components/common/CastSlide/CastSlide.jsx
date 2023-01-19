import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import uiConfigs from '../../../configs/uiConfigs';
import { routesGen } from '../../../routes/routes';
import uiCastSlide from './uiCastSlide';

const CastSlide = ({ casts }) => {
  return (
    <Box sx={{ ...uiCastSlide.mainBox }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={'auto'}
        grabCursor={true}
        style={{ width: '100%', height: 'max-content' }}
      >
        {casts.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGen.person(cast.id)}>
              <Box sx={{ ...uiCastSlide.linkedBox(cast) }}>
                <Box sx={{ ...uiCastSlide.innerBox }}>
                  <Typography
                    sx={{ ...uiConfigs.style.typoLines(1, 'center') }}
                  >
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CastSlide;
