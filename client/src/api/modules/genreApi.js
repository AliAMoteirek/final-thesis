import publicClient from '../client/publicClient';

const genreEndpoints = {
  list: ({ mediaType }) => `media/${mediaType}/genres`,
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(
        genreEndpoints.list({ mediaType })
      );

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default genreApi;
