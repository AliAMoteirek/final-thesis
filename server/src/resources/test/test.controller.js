import { Router } from 'express';
import TestService from './test.service.js';

class TestController {
  path = '/';
  router = Router();
  #testService = new TestService();

  constructor() {
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.router.get('/', this.#welcome());
  }

  #welcome() {
    return (req, res) => {
      res.status(200).json({
        msg: 'Welcome to our site',
      });
    };
  }
}

export default TestController;
