import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import reviewApi from '../../../api/modules/reviewApi';
import Container from '../Container';
import FilteredReviews from './FilteredReviews';
import UserReview from './UserReview';

const MediaReviews = ({ reviews, media, mediaType }) => {
  const { user } = useSelector((state) => state.user);
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState('');
  const [reviewCount, setReviewCount] = useState(0);

  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilteredReviews([...reviews].splice(0, skip));
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, err } = await reviewApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success('Successfully posted a review');

      setFilteredReviews([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent('');
    }
  };

  const onLoadMore = () => {
    setFilteredReviews([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilteredReviews([...newListReviews].splice(0, page * skip));
    } else {
      setFilteredReviews([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);

    toast.success('Successfully removed a review');
  };

  return (
    <>
      <Container header={`Reviews (${reviewCount})`}>
        <FilteredReviews
          filteredReviews={filteredReviews}
          listReviews={listReviews}
          onLoadMore={onLoadMore}
          onRemoved={onRemoved}
        />
        <UserReview
          content={content}
          onAddReview={onAddReview}
          onRequest={onRequest}
          setContent={setContent}
          user={user}
        />
      </Container>
    </>
  );
};

export default MediaReviews;
