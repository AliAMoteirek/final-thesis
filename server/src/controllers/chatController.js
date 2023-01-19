import { Configuration, OpenAIApi } from 'openai';
import responseHandler from '../handlers/responseHandler.js';

const getChatMainPage = async (req, res) => {
  try {
    responseHandler.ok(res, {
      message: 'This is ChatGPT Ai App',
    });
  } catch {
    responseHandler.error(re);
  }
};

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const addChat = async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: req.body.input,
      temperature: 0.5,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    console.log('PASSED: ', req.body.input);
    responseHandler.ok(res, { bot: response.data.choices[0].text });
  } catch {
    responseHandler.error(res);
  }
};

export default { getChatMainPage, addChat };
