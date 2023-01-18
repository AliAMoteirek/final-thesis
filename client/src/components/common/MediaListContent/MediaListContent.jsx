import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import tmdbConfigs from '../../../api/configs/tmdbConfigs';
import uiConfigs from '../../../configs/uiConfigs';
import MediaGrid from '../MediaGrid/MediaGrid';

const MediaListContent = ({
  mediaType,
  category,
  currCategory,
  onCategoryChange,
  medias,
  mediaLoading,
  onLoadMore,
}) => {
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Stack
        spacing={2}
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        sx={{ marginBottom: 4 }}
      >
        <Typography fontWeight="700" variant="h5">
          {mediaType === tmdbConfigs.mediaType.movie ? 'Movies' : 'TV Series'}
        </Typography>

        <Stack direction="row" spacing={2}>
          {category.map((cate, index) => (
            <Button
              key={index}
              size="large"
              variant={currCategory === index ? 'contained' : 'text'}
              sx={{
                color:
                  currCategory === index
                    ? 'primary.contrastText'
                    : 'text.primary',
              }}
              onClick={() => onCategoryChange(index)}
            >
              {cate}
            </Button>
          ))}
        </Stack>
      </Stack>
      <MediaGrid medias={medias} mediaType={mediaType} />
      <LoadingButton
        sx={{ marginTop: 8 }}
        fullWidth
        color="primary"
        loading={mediaLoading}
        onClick={onLoadMore}
      >
        load more
      </LoadingButton>
    </Box>
  );
};

export default MediaListContent;
