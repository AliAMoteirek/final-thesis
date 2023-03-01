import tmdbApi from '../../tmdb/tmdb.api.js';

class PersonService {
  async personDetail(req) {
    try {
      const { personId } = req.params;
      const person = await tmdbApi.personDetail({ personId });
      return person;
    } catch {
      throw new Error('Something went wrong!');
    }
  }

  async personMedias(req) {
    try {
      const { personId } = req.params;
      const medias = await tmdbApi.personMedias({ personId });
      return medias;
    } catch {
      throw new Error('Something went wrong!');
    }
  }
}

export default PersonService;
