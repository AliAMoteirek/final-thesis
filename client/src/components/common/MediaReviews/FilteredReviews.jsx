import { Box, Button, Divider, Stack } from '@mui/material';
import ReviewItem from './ReviewItem';

const FilteredReviews = ({
  filteredReviews,
  onRemoved,
  listReviews,
  onLoadMore,
}) => {
  return (
    <Stack spacing={4} marginBottom={2}>
      {filteredReviews.map((item) => (
        <Box key={item.id}>
          <ReviewItem review={item} onRemoved={onRemoved} />
          <Divider
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          />
        </Box>
      ))}
      {filteredReviews.length < listReviews.length && (
        <Button onClick={onLoadMore}>load more</Button>
      )}
    </Stack>
  );
};

export default FilteredReviews;
