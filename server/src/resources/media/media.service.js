import tmdbApi from '../../tmdb/tmdb.api.js';
import userModel from '../user/user.model.js';
import authenticated from '../../middleware/authenticated.middleware.js';
import favoriteModel from '../favorite/favorite.model.js';
import reviewModel from '../review/review.model.js';

class Mediaservice {
  async getList(req) {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    try {
      const response = await tmdbApi.mediaList({
        mediaType,
        mediaCategory,
        page,
      });

      return response;
    } catch (error) {
      throw new Error('Something went wrong!');
    }
  }

  async getGenres(req) {
    const { mediaType } = req.params;

    try {
      const response = await tmdbApi.mediaGenres({ mediaType });
      return response;
    } catch (error) {
      throw new Error('Something went wrong!');
    }
  }

  async search(req) {
    try {
      const { mediaType } = req.params;
      const { query, page } = req.query;

      const response = await tmdbApi.mediaSearch({
        query,
        page,
        mediaType: mediaType === 'people' ? 'person' : mediaType,
      });

      return response;
    } catch {
      throw new Error('Something went wrong!');
    }
  }

  async getDetail(req) {
    try {
      const { mediaType, mediaId } = req.params;

      const params = { mediaType, mediaId };

      const media = await tmdbApi.mediaDetail(params);

      media.credits = await tmdbApi.mediaCredits(params);

      const vidoes = await tmdbApi.mediaVideos(params);

      media.vidoes = vidoes;

      const recommend = await tmdbApi.mediaRecommend(params);

      media.recommend = recommend.results;

      media.images = await tmdbApi.mediaImages(params);

      const tokenDecoded = authenticated.tokenDecode(req);

      if (tokenDecoded) {
        const user = await userModel.findById(tokenDecoded.data);

        if (user) {
          const isFavorite = await favoriteModel.findOne({
            user: user.id,
            mediaId,
          });
          media.isFavorite = isFavorite !== null;
        }
      }

      media.reviews = await reviewModel
        .find({ mediaId })
        .populate('user')
        .sort('-createdAt');

      return media;
    } catch {
      throw new Error('Something went wrong!');
    }
  }
}

export default Mediaservice;
