import HeroSlide from '../components/common/HeroSlide/HeroSlide';
import tmdbConfigs from '../api/configs/tmdbConfigs';

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </>
  );
};

export default HomePage;
