import tmdbConfigs from '../../api/configs/tmdbConfigs';

const movieDetails = [
  {
    id: 1,
    header: 'popular movies',
    type: tmdbConfigs.mediaType.movie,
    Category: tmdbConfigs.mediaCategory.popular,
  },
  {
    id: 2,
    header: 'popular series',
    type: tmdbConfigs.mediaType.tv,
    Category: tmdbConfigs.mediaCategory.popular,
  },
  {
    id: 3,
    header: 'top rated movies',
    type: tmdbConfigs.mediaType.movie,
    Category: tmdbConfigs.mediaCategory.top_rated,
  },
  {
    id: 4,
    header: 'top rated series',
    type: tmdbConfigs.mediaType.tv,
    Category: tmdbConfigs.mediaCategory.top_rated,
  },
];

export default movieDetails;
