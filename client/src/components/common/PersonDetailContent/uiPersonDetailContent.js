import tmdbConfigs from '../../../api/configs/tmdbConfigs';

const uiPersonDetailContent = {
  containerBox: {
    position: 'relative',
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
  },
  personsPoster: (person) => ({
    paddingTop: '160%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: 'darkgrey',
    backgroundImage: `url(${tmdbConfigs.posterPath(person.profile_path)})`,
    borderRadius: '15px',
  }),
};

export default uiPersonDetailContent;
