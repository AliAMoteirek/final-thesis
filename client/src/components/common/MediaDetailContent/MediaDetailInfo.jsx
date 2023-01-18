import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import tmdbConfigs from '../../../api/configs/tmdbConfigs';
import uiConfigs from '../../../configs/uiConfigs';
import CastSlide from '../CastSlide/CastSlide';
import CircularRate from '../CircularRate/CircularRate';
import Container from '../Container';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MediaDetailInfo = ({
  media,
  mediaType,
  genres,
  videoRef,
  onRequest,
  isFavorite,
}) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '60%' },
        color: 'text.primary',
      }}
    >
      <Stack spacing={5}>
        {/* Title */}
        <Typography
          variant="h4"
          fontSize={{ xs: '2rem', md: '2rem', lg: '4rem' }}
          fontWeight="700"
          sx={{ ...uiConfigs.style.typoLines(2, 'left') }}
        >
          {`${media.title || media.name} ${
            mediaType === tmdbConfigs.mediaType.movie
              ? media.release_date.split('-')[0]
              : media.first_air_date.split('-')[0]
          }`}
        </Typography>
        {/* Title */}

        {/* rate and genres */}
        <Stack direction="row" spacing={1} alignItems="center">
          {/* rate */}
          <CircularRate value={media.vote_average} />
          {/* rate */}
          <Divider orientation="vertical" />
          {/* genres */}
          {genres.map((genre, index) => (
            <Chip
              label={genre.name}
              variant="filled"
              color="primary"
              key={index}
            />
          ))}
          {/* genres */}
        </Stack>
        {/* rate and genres */}

        {/* overview */}
        <Typography variant="body1" sx={{ ...uiConfigs.style.typoLines(5) }}>
          {media.overview}
        </Typography>
        {/* overview */}

        {/* buttons */}
        <Stack direction="row" spacing={1}>
          <LoadingButton
            variant="text"
            sx={{
              width: 'max-content',
              '& .MuiButton-starIcon': { marginRight: '0' },
            }}
            size="large"
            startIcon={
              isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />
            }
            loadingPosition="start"
            loading={onRequest}
            // onClick={}
          />
          <Button
            variant="contained"
            sx={{ width: 'max-content' }}
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={() => videoRef.current.scrollIntoView()}
          >
            watch now
          </Button>
        </Stack>
        {/* buttons */}

        {/* cast */}
        <Container header="Cast">
          <CastSlide casts={media.credits.cast} />
        </Container>
        {/* cast */}
      </Stack>
    </Box>
  );
};

export default MediaDetailInfo;
