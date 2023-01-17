import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { SwiperSlide } from 'swiper/react';
import mediaApi from '../../../api/modules/mediaApi';
import AutoSwiper from './AutoSwiper';

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.results);

      if (error) toast.error(error.message);
    };

    getMedias();
  }, [mediaCategory, mediaType]);

  console.log(medias);

  return (
    <>
      <AutoSwiper>
        {medias.map((media, index) => (
          <SwiperSlide key={index}></SwiperSlide>
        ))}
      </AutoSwiper>
    </>
  );
};

export default MediaSlide;
