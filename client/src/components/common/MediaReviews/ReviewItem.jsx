import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import reviewApi from '../../..//api/modules/reviewApi';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';
import uiReviewItem from './uiReviewItem';
import TextAvatar from '../TextAvatar/TextAvatar';

const ReviewItem = ({ review, onRemoved }) => {
  const { user } = useSelector((state) => state.user);

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const { response, error } = await reviewApi.remove({ reviewId: review.id });

    if (error) toast.error(error.message);

    if (response) onRemoved(review.id);
  };

  return (
    <Box sx={{ ...uiReviewItem.mainBox(onRequest) }}>
      <Stack direction="row" spacing={2}>
        {/* avatar */}
        <TextAvatar text={review.user.displayName} />
        {/* avatar */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.user.displayName}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format('DD-MM-YYYY HH:mm:ss')}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{ ...uiReviewItem.loadingButton }}
            >
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ReviewItem;
