import App from './app.js';
import 'dotenv/config';
import TestController from './resources/test/test.controller.js';
import validateEnv from './utils/validate.env.js';
import PersonController from './resources/person/person.controller.js';
import UserController from './resources/user/user.controller.js';
import ReviewController from './resources/review/review.controller.js';
import MediaController from './resources/media/media.controller.js';
import ChatController from './resources/chat/chat.controller.js';

validateEnv();

const PORT = process.env.PORT || 8800;

const app = new App(
  [
    new MediaController(),
    new TestController(),
    new UserController(),
    new ReviewController(),
    new PersonController(),
    new ChatController(),
  ],
  PORT
);

app.listen();
