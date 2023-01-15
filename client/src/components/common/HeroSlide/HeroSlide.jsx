import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { toast } from 'react-toastify';
import { setGlobalLoading } from '../../../redux/features/globalLoadingSlice';
import { routesGen } from '../../../routes/routes';
import uiConfigs from '../../../configs/uiConfigs';
import CircularRate from '../CircularRate/CircularRate';

import tmdbConfigs from '../../../api/configs/tmdbConfigs';
import genreApi from '../../../api/modules/genreApi';
import mediaApi from '../../../api/modules/mediaApi';
import uiHeroSlide from './uiHeroSlide';

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });
      if (response) setMovies(response.results);
      if (error) toast.error(error.message);
      dispatch(setGlobalLoading(false));
    };

    const getGenres = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setGlobalLoading(false);
      }
    };

    getGenres();
  }, [dispatch, mediaCategory, mediaType]);

  return (
    <Box sx={{ ...uiHeroSlide.mainBox(theme.palette.mode) }}>
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{ width: '100%', height: 'max-content' }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={index}>
            <Box sx={{ ...uiHeroSlide.boxBackdrop(movie) }} />
            <Box
              sx={{ ...uiHeroSlide.boxHorizontalGradient(theme.palette.mode) }}
            />
            <Box sx={{ ...uiHeroSlide.boxMovieDetailsContainer }}>
              <Box sx={{ ...uiHeroSlide.boxMovieDetails }}>
                <Stack spacing={4} direction="column">
                  {/* Title */}
                  <Typography
                    variant="h4"
                    fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
                    fontWeight="700"
                    sx={{
                      ...uiConfigs.style.typoLines(2, 'left'),
                    }}
                  >
                    {movie.title || movie.name}
                  </Typography>
                  {/* Title */}

                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* rating */}
                    <CircularRate value={movie.vote_average} />
                    {/* rating */}

                    <Divider orientation="vertical" />
                    {/* genres */}
                    {[...movie.genre_ids].splice(0, 2).map((genreId, index) => (
                      <Chip
                        variant="filled"
                        color="primary"
                        key={index}
                        label={
                          genres.find((e) => e.id === genreId) &&
                          genres.find((e) => e.id === genreId).name
                        }
                      />
                    ))}
                    {/* genres */}
                  </Stack>

                  {/* Overview */}
                  <Typography
                    variant="body1"
                    sx={{
                      ...uiConfigs.style.typoLines(3),
                    }}
                  >
                    {movie.overview}
                  </Typography>
                  {/* Overview */}

                  {/* Buttons */}
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    component={Link}
                    to={routesGen.mediaDetail(mediaType, movie.id)}
                    sx={{
                      width: 'max-content',
                    }}
                  >
                    watch now
                  </Button>
                  {/* Buttons */}
                </Stack>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
