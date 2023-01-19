import express from 'express';
import chatController from '../controllers/chatController.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import requestHandler from '../handlers/requestHandler.js';

const router = express.Router({ mergeParams: true });

router.get('/', tokenMiddleware.auth, chatController.getChatMainPage);

router.post(
  '/',
  tokenMiddleware.auth,
  requestHandler.validate,
  chatController.addChat
);

export default router;
