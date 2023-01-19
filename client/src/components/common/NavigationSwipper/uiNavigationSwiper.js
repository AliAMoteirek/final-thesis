const uiNavigationSwiper = {
  mainBox: {
    '& .swiper-slide': {
      width: '100%',
      opacity: '0.6',
      paddingBottom: '3rem',
    },
    '& .swiper-slide-active': { opacity: 1 },
    '& .swiper-pagination-bullet': {
      backgroundColor: 'text.primary',
    },
    '& .swiper-button-next, & .swiper-button-prev': {
      color: 'text.primary',
      '&::after': {
        fontSize: { xs: '1rem', md: '2rem' },
      },
    },
    '& .swiper': {
      paddingX: { xs: '1rem', md: '4rem' },
    },
  },
};

export default uiNavigationSwiper;
