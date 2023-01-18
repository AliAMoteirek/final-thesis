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
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';
import favoriteApi from '../api/modules/favoriteApi';
import Container from '../components/common/Container';
import MediaVideosSlide from '../components/common/MediaVideosSlide/MediaVideosSlide';
import BackdropSlide from '../components/common/BackdropSlide/BackdropSlide';
import PosterSlide from '../components/common/PosterSlide/PosterSlide';
import RecommendSlide from '../components/common/RecommendSlide/RecommendSlide';
import MediaSlide from '../components/common/MediaSlide/MediaSlide';
import MediaReviews from '../components/common/MediaReviews/MediaReviews';

const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites } = useSelector((state) => state.user);

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

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, error } = await favoriteApi.add(body);

    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success('Successfully added to favorites');
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const favorite = listFavorites.find(
      (e) => e.mediaId.toString() === media.id.toString()
    );

    const { response, error } = await favoriteApi.remove({
      favoriteId: favorite.id,
    });

    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success('Successfully removed from favorites');
    }
  };

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
            <MediaDetailPoster media={media} />

            <MediaDetailInfo
              genres={genres}
              isFavorite={isFavorite}
              media={media}
              mediaType={mediaType}
              onRequest={onRequest}
              videoRef={videoRef}
              onFavoriteClick={onFavoriteClick}
            />
          </Box>
        </Box>
        {/* media content */}

        {/* media vidoes */}
        <div ref={videoRef} style={{ paddingTop: '2rem' }}>
          <Container header="Vidoes">
            <MediaVideosSlide videos={[...media.vidoes.results.splice(0, 5)]} />
          </Container>
        </div>
        {/* media vidoes */}

        {/* media backdrop */}
        {media.images.backdrops.length > 0 && (
          <Container header="backdrops">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}
        {/* media backdrop */}

        {/* media posters */}
        {media.images.posters.length > 0 && (
          <Container header="posters">
            <PosterSlide posters={media.images.posters} />
          </Container>
        )}
        {/* media posters */}

        {/* media reviews */}
        <MediaReviews
          reviews={media.reviews}
          media={media}
          mediaType={mediaType}
        />
        {/* media reviews */}

        {/* media recommendation */}
        <Container header="you may also like">
          {media.recommend.length > 0 && (
            <RecommendSlide medias={media.recommend} mediaType={mediaType} />
          )}
          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
        {/* media recommendation */}
      </Box>
    </>
  ) : null;
};

export default MediaDetail;
