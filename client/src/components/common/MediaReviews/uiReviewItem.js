const uiReviewItem = {
  mainBox: (onRequest) => ({
    padding: 2,
    borderRadius: '5px',
    position: 'relative',
    opacity: onRequest ? 0.6 : 1,
    '&::hover': { backgroundColor: 'background.paper' },
  }),
  loadingButton: {
    position: { xs: 'relative', md: 'absolute' },
    right: { xs: 0, md: '10px' },
    marginTop: { xs: 2, md: 0 },
    width: 'max-content',
  },
};

export default uiReviewItem;
