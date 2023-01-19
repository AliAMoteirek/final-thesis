import { useState } from 'react';
import reviewApi from '../../../api/modules/reviewApi';
import { toast } from 'react-toastify';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routesGen } from '../../../routes/routes';
import uiConfigs from '../../../configs/uiConfigs';
import { LoadingButton } from '@mui/lab';
import dayjs from 'dayjs';
import DeleteIcon from '@mui/icons-material/Delete';
import uiReviewItems from './uiReviewItems';

const ReviewItems = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const { response, error } = await reviewApi.remove({ reviewId: review.id });

    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      toast.success('Successfully removed from reviews');
      onRemoved(review.id);
    }
  };

  return (
    <Box sx={{ ...uiReviewItems.boxContainer(onRequest) }}>
      <Box
        sx={{
          width: { xs: 0, md: '10%' },
        }}
      >
        <Link
          to={routesGen.mediaDetail(review.mediaType, review.mediaid)}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Box sx={{ ...uiReviewItems.linkedBox(review) }} />
        </Link>
      </Box>

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
      <LoadingButton
        variant="contained"
        sx={{ ...uiReviewItems.loadingButton }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </Box>
  );
};

export default ReviewItems;
