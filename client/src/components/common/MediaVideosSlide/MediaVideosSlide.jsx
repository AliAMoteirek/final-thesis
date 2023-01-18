import { SwiperSlide } from 'swiper/react';
import NavigationSwipper from '../NavigationSwipper/NavigationSwipper';
import MediaVideo from './MediaVideo';

const MediaVideosSlide = ({ videos }) => {
  return (
    <NavigationSwipper>
      {videos.map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideo video={video} />
        </SwiperSlide>
      ))}
    </NavigationSwipper>
  );
};

export default MediaVideosSlide;
