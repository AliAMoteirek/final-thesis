import { Router } from 'express';
import userModel from './user.model.js';
import userValidation from './user.validation.js';
import UserService from './user.service.js';
import HttpException from '../../utils/exceptions/http.exception.js';
import authenticated from '../../middleware/authenticated.middleware.js';
import FavoriteService from '../favorite/favorite.service.js';

class UserController {
  path = '/user';
  router = Router();
  #userService = new UserService();
  #favoriteService = new FavoriteService();

  constructor() {
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    userValidation.register(this.path, this.router, this.#signup);
    userValidation.login(this.path, this.router, this.#signin);
    userValidation.updatePassword(this.path, this.router, this.#updatePassword);

    this.router.get(`${this.path}/info`, authenticated.auth, this.#getInfo);

    this.router.get(
      `${this.path}/favorites`,
      authenticated.auth,
      this.#favoriteService.getFavortiesOfUser
    );

    userValidation.addFavorite(
      this.path,
      this.router,
      this.#favoriteService.addFavorite
    );

    this.router.delete(
      `${this.path}/favorites/:favoriteId`,
      authenticated.auth,
      this.#favoriteService.removeFavorite
    );
  }

  #signup = async (req, res, next) => {
    try {
      const { username, password, displayName } = req.body;

      const { token, user, id } = await this.#userService.signup(
        username,
        password,
        displayName
      );
      res.status(201).json({ token, ...user, id });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  #signin = async (req, res, next) => {
    try {
      const { username, password } = req.body;

      const { user, token, id } = await this.#userService.singin(
        username,
        password
      );
      res.status(201).json({ token, ...user, id });
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  #updatePassword = async (req, res, next) => {
    try {
      const { password, newPassword } = req.body;

      const user = await userModel
        .findById(req.user.id)
        .select('password id salt');

      if (!user)
        return res.status(401).json({ status: 401, message: 'Unauthorized' });

      if (!user.validPassword(password))
        return res.status(400).json({ status: 400, message: 'Wrong password' });

      user.setPassword(newPassword);

      await user.save();

      res.status(200).json(user);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };

  #getInfo = async (req, res, next) => {
    try {
      const user = await userModel.findById(req.user.id);

      if (!user)
        return res
          .status(404)
          .json({ status: 404, message: 'Resource not found!' });

      res.status(200).json(user);
    } catch (error) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
