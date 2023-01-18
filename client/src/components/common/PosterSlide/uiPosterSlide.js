import tmdbConfigs from '../../../api/configs/tmdbConfigs';

const uiPosterSlide = {
  mainBox: (item) => ({
    paddingTop: '60%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `url(${tmdbConfigs.posterPath(item.file_path)})`,
  }),
};

export default uiPosterSlide;
