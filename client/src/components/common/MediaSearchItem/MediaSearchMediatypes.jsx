import { Button, Stack } from '@mui/material';

const MediaSearchMediatypes = ({ mediaTypes, mediaType, onCategoryChange }) => {
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="center"
      sx={{ width: '100%' }}
    >
      {mediaTypes.map((item, index) => (
        <Button
          size="large"
          key={index}
          variant={mediaType === item ? 'contained' : 'text'}
          sx={{
            color: mediaType === item ? 'primary.contrastTex' : 'text.primary',
          }}
          onClick={() => onCategoryChange(item)}
        >
          {item}
        </Button>
      ))}
    </Stack>
  );
};

export default MediaSearchMediatypes;
