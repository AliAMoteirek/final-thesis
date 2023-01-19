import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import favoriteApi from '../api/modules/favoriteApi';
import Container from '../components/common/Container';
import FavoriteItem from '../components/common/FavoriteItem/FavoriteItem';
import uiConfigs from '../configs/uiConfigs';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await favoriteApi.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);

      if (response) {
        setCount(response.length);
        setMedias([...response]);
        setFilteredMedias([...response].splice(0, skip));
      }
    };
    getFavorites();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias.filter((e) => e.id !== id)];
    setMedias(newMedias);
    setFilteredMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your Favorites (${count})`}>
        <Grid container spacing={5} sx={{ marginRight: '-8px !important' }}>
          {filteredMedias.map((media, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {filteredMedias.length < medias.length && (
          <Button onClick={onLoadMore}>load more</Button>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
