import { Box, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import uiConfigs from '../../../configs/uiConfigs';
import { routesGen } from '../../../routes/routes';

const ReviewContent = ({ review }) => {
  return (
    <Box
      sx={{
        width: { xs: '100%', md: '80%' },
        padding: { xs: 0, md: '0 2rem' },
      }}
    >
      <Stack spacing={1}>
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Typography
            variant="h6"
            sx={{
              ...uiConfigs.style.typoLines(1, 'left'),
            }}
          >
            {review.mediaTitle}
          </Typography>
        </Link>
        <Typography
          variant="caption"
          style={{
            color: 'gray',
            fontWeight: '700',
            fontSize: '1rem',
            fontStyle: 'italic',
          }}
        >
          {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
        </Typography>
        <Typography>{review.content}</Typography>
      </Stack>
    </Box>
  );
};

export default ReviewContent;
