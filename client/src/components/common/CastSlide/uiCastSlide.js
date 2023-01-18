import tmdbConfigs from '../../../api/configs/tmdbConfigs';
import uiConfigs from '../../../configs/uiConfigs';

const uiCastSlide = {
  mainBox: {
    '& .swiper-slide': {
      width: { xs: '50%', md: '25%', lg: '20.5' },
      color: 'primary.contrastText',
    },
  },
  linkedBox: (cast) => ({
    paddingTop: '120%',
    color: 'text.primary',
    ...uiConfigs.style.backgroundImage(
      tmdbConfigs.posterPath(cast.profile_path)
    ),
    borderRadius: '10px',
  }),
  innerBox: {
    position: 'absolute',
    width: '100%',
    height: 'max-content',
    bottom: 0,
    padding: '10px',
    backgroundColor: 'rgba(10,32,41,0.6)',
  },
};

export default uiCastSlide;
