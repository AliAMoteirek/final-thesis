import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import mediaApi from '../api/modules/mediaApi';
import ImageHeader from '../components/common/ImageHeader/ImageHeader';
import tmdbConfigs from '../api/configs/tmdbConfigs';
import { Box } from '@mui/material';
import uiConfigs from '../configs/uiConfigs';
import MediaDetailPoster from '../components/common/MediaDetailContent/MediaDetailPoster';
import MediaDetailInfo from '../components/common/MediaDetailContent/MediaDetailInfo';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorite } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));

      const { response, error } = await mediaApi.getDetail({
        mediaType,
        mediaId,
      });

      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setGenres(response.genres.splice(0, 2));
      }

      if (error) toast.error(error.message);
    };

    getMedia();
  }, [dispatch, mediaId, mediaType]);

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path
        )}
      />
      <Box
        sx={{
          color: 'primary.contrastText',
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: '-10rem', md: '-15rem', lg: '-20rem' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { md: 'row', xs: 'column' },
            }}
          >
            {/* poster */}
            <MediaDetailPoster media={media} />
            {/* poster */}

            {/* media info */}
            <MediaDetailInfo
              genres={genres}
              isFavorite={isFavorite}
              media={media}
              mediaType={mediaType}
              onRequest={onRequest}
              videoRef={videoRef}
            />
            {/* media info */}
          </Box>
        </Box>
        {/* media content */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
