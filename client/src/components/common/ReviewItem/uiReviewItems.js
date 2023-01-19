import tmdbConfigs from '../../../api/configs/tmdbConfigs';
import uiConfigs from '../../../configs/uiConfigs';

const uiReviewItems = {
  boxContainer: (onRequest) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    padding: 1,
    opacity: onRequest ? 0.6 : 1,
    '&:hover': { backgroundColor: 'background.paper' },
  }),
  linkedBox: (review) => ({
    paddingTop: '160%',
    ...uiConfigs.style.backgroundImage(
      tmdbConfigs.posterPath(review.mediaPoster)
    ),
    borderRadius: '5px',
  }),
  loadingButton: {
    position: { xs: 'relative', md: 'absolute' },
    right: { xs: 0, md: '10px' },
    marginTop: { xs: 2, md: 0 },
    width: 'max-content',
  },
};

export default uiReviewItems;
