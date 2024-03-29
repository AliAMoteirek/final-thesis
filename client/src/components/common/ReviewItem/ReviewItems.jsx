import { useState } from 'react';
import reviewApi from '../../../api/modules/reviewApi';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import uiReviewItems from './uiReviewItems';
import ReviewPoster from './ReviewPoster';
import ReviewLoadingButton from './ReviewLoadingButton';
import ReviewContent from './ReviewContent';

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
      <ReviewPoster review={review} />
      <ReviewContent review={review} />
      <ReviewLoadingButton onRemove={onRemove} onRequest={onRequest} />
    </Box>
  );
};

export default ReviewItems;
