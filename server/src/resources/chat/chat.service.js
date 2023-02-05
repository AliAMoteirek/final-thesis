import openai from './chat.config.js';

class ChatService {
  addChat = async (req) => {
    try {
      const response = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.input,
        temperature: 0,
        max_tokens: 4000,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });

      console.log('PASSED: ', req.body.input);

      return { bot: response.data.choices[0].text };
    } catch {
      throw new Error('Something went wrong!');
    }
  };
}

export default ChatService;
