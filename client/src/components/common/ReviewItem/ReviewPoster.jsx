import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { routesGen } from '../../../routes/routes';
import uiReviewItems from './uiReviewItems';

const ReviewPoster = ({ review }) => {
  return (
    <Box
      sx={{
        width: { xs: 0, md: '10%' },
      }}
    >
      <Link
        to={routesGen.mediaDetail(review.mediaType, review.mediaId)}
        style={{ color: 'unset', textDecoration: 'none' }}
      >
        <Box sx={{ ...uiReviewItems.linkedBox(review) }} />
      </Link>
    </Box>
  );
};

export default ReviewPoster;
