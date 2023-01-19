import HeroSlide from '../components/common/HeroSlide/HeroSlide';
import tmdbConfigs from '../api/configs/tmdbConfigs';
import { Box } from '@mui/material';
import Container from '../components/common/Container';
import uiConfigs from '../configs/uiConfigs';
import movieDetails from './assets/movieDetails';
import MediaSlide from '../components/common/MediaSlide/MediaSlide';

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
      <Box
        marginTop="-4rem"
        sx={{
          ...uiConfigs.style.mainContent,
        }}
      >
        {movieDetails.map((movie) => (
          <Container key={movie.id} header={movie.header}>
            <MediaSlide mediaType={movie.type} mediaCategory={movie.Category} />
          </Container>
        ))}
      </Box>
    </>
  );
};

export default HomePage;
