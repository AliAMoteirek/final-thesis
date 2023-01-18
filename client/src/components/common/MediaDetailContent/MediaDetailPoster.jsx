import { Box } from '@mui/material';
import tmdbConfigs from '../../../api/configs/tmdbConfigs';
import uiConfigs from '../../../configs/uiConfigs';

const MediaDetailPoster = ({ media }) => {
  return (
    <Box
      sx={{
        width: { xs: '70%', sm: '50%', md: '40%' },
        margin: { xs: '0 auto 2rem', md: '0 2rem 0 0' },
      }}
    >
      <Box
        sx={{
          paddingTop: '140%',
          ...uiConfigs.style.backgroundImage(
            tmdbConfigs.posterPath(media.poster_path || media.backdrop_path)
          ),
          borderRadius: '15px',
        }}
      />
    </Box>
  );
};

export default MediaDetailPoster;
