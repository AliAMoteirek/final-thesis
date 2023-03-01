import privateClient from '../client/privateClient';
import publicClient from '../client/publicClient';

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }) =>
    `media/${mediaType}/category/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }) => `media/${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }) =>
    `media/${mediaType}/search?query=${query}&page=${page}`,
};

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }) => {
    try {
      const response = await publicClient.get(
        mediaEndpoints.list({ mediaType, mediaCategory, page })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  getDetail: async ({ mediaType, mediaId }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.detail({ mediaType, mediaId })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
  search: async ({ mediaType, query, page }) => {
    try {
      const response = await privateClient.get(
        mediaEndpoints.search({ mediaType, query, page })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default mediaApi;
