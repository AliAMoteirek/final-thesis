import { LoadingButton } from '@mui/lab';
import uiReviewItems from './uiReviewItems';
import DeleteIcon from '@mui/icons-material/Delete';

const ReviewLoadingButton = ({ onRequest, onRemove }) => {
  return (
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
  );
};

export default ReviewLoadingButton;
