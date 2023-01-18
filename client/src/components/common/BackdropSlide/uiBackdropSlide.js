import tmdbConfigs from '../../../api/configs/tmdbConfigs';

const uiBackdropSlide = {
  mainBox: (item) => ({
    paddingTop: '60%',
    backgroundPosition: 'top',
    backgroundSize: 'cover',
    backgroundImage: `url(${tmdbConfigs.backdropPath(item.file_path)})`,
  }),
};

export default uiBackdropSlide;
