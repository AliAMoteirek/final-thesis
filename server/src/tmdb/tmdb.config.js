const { TMDB_BASE_URL, TMDB_KEY } = process.env;

const getUrl = (endpoint, params) => {
  const qs = new URLSearchParams(params);

  return `${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_KEY}&${qs}`;
};

export default { getUrl };
