import { Router } from 'express';
import authenticatedMiddleware from '../../middleware/authenticated.middleware.js';
import HttpException from '../../utils/exceptions/http.exception.js';
import openai from './chat.config.js';
import ChatService from './chat.service.js';

class ChatController {
  path = '/chat';
  router = Router();
  #chatServie = new ChatService();

  constructor() {
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.router.get(
      `${this.path}/`,
      authenticatedMiddleware.auth,
      this.#welcome
    );
    this.router.post(
      `${this.path}/`,
      authenticatedMiddleware.auth,
      this.#addChat
    );
  }

  #welcome(req, res) {
    res.status(200).json({ msg: 'Welcome to ChatGPT. This is ChatGPT Ai App' });
  }

  #addChat = async (req, res, next) => {
    try {
      const { bot } = await this.#chatServie.addChat(req);

      res.status(200).json({ bot });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}

export default ChatController;
