import { useState } from 'react';
import { useDispatch } from 'react-redux';
import favoriteApi from '../../../api/modules/favoriteApi';
import { toast } from 'react-toastify';
import { removeFavorite } from '../../../redux/features/userSlice';
import MediaItem from '../MediaSlide/MediaItem';
import { LoadingButton } from '@mui/lab';
import DeleteIcon from '@mui/icons-material/Delete';

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();

  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;

    setOnRequest(true);

    const { response, error } = await favoriteApi.remove({
      favoriteId: media.id,
    });

    setOnRequest(false);

    if (error) toast.error(error.message);

    if (response) {
      toast.success('Successfully removed from favorites');
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{ marginTop: 5 }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        remove
      </LoadingButton>
    </>
  );
};

export default FavoriteItem;
