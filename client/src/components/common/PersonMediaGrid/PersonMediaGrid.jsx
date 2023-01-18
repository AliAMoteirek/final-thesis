import { Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import tmdbConfigs from '../../../api/configs/tmdbConfigs';
import personApi from '../../../api/modules/personApi';
import { toast } from 'react-toastify';
import MediaItem from '../MediaSlide/MediaItem';

const PersonMediaGrid = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  useEffect(() => {
    const getMedias = async () => {
      const { response, error } = await personApi.medias({ personId });

      if (error) toast.error(error.message);

      if (response) {
        const mediasSorted = response.cast.sort(
          (a, b) => getRelesaseDate(b) - getRelesaseDate(a)
        );
        setMedias([...mediasSorted]);
        setFilteredMedias([...mediasSorted].slice(0, skip));
      }
    };

    getMedias();
  }, [personId]);

  const getRelesaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);

    return date.getTime();
  };

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={3} sx={{ marginRight: '-8px !important' }}>
        {filteredMedias.map((media, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={onLoadMore}>load more</Button>
      )}
    </>
  );
};

export default PersonMediaGrid;
