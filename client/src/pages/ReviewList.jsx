import { Box, Button, Divider, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import reviewApi from '../api/modules/reviewApi';
import Container from '../components/common/Container';
import ReviewItems from '../components/common/ReviewItem/ReviewItems';
import uiConfigs from '../configs/uiConfigs';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const skip = 8;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await reviewApi.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);

      if (response) {
        setCount(response.length);
        setReviews([...response]);
        setFilteredReviews([...response].splice(0, skip));
      }
    };
    getReviews();
  }, [dispatch]);

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...reviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newReviews = [...reviews.filter((e) => e.id !== id)];
    setReviews(newReviews);
    setFilteredReviews([...newReviews].splice(0, page * skip));
    setCount(count - 1);
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your reviews (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItems review={item} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewList;
