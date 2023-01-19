import privateClient from '../client/privateClient';

const chatEndpoints = {
  add: 'chat/',
  get: 'chat/',
};

const chatApi = {
  get: async () => {
    try {
      const response = await privateClient.get(chatEndpoints.get);

      return { response };
    } catch (error) {
      return { error };
    }
  },

  add: async ({ input }) => {
    try {
      const response = await privateClient.post(chatEndpoints.add, {
        input,
      });

      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default chatApi;
