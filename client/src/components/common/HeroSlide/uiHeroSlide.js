const uiHeroSlide = {
  mainBox: (ui) => ({
    position: 'relative',
    color: 'primary.contrastText',
    '&::before': {
      content: '""',
      width: '100%',
      height: '30%',
      position: 'absolute',
      bottom: 0,
      left: 0,
      zIndex: 2,
      pointerEvents: 'none',
      ui,
    },
  }),
  boxBackdrop: (path) => ({
    paddingTop: {
      xs: '130%',
      sm: '80%',
      md: '60%',
      lg: '45%',
    },
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundImage: `url(${path})`,
  }),
  boxHorizontalGradient: (ui) => ({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    ui,
  }),
  boxMovieDetailsContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    paddingX: { sm: '10px', md: '5rem', lg: '10rem' },
  },
  boxMovieDetails: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingX: '30px',
    color: 'text.primary',
    width: { sm: 'unset', md: '30%', lg: '40%' },
  },
};

export default uiHeroSlide;
