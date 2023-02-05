import { Router } from 'express';
import Mediaservice from './media.service.js';
import HttpException from '../../utils/exceptions/http.exception.js';

class MediaController {
  path = '/media/:mediaType';
  router = Router();
  #mediaService = new Mediaservice();

  constructor() {
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.router.get(`${this.path}/`, (req, res) => {
      res.status(200).json({ msg: 'Welcome to moviehouse' });
    });
    this.router.get(`${this.path}/genres`, this.#getGenres);
    this.router.get(`${this.path}/category/:mediaCategory`, this.#getList);
    this.router.get(`${this.path}/search`, this.#search);
    this.router.get(`${this.path}/detail/:mediaId`, this.#getDetail);
  }

  #getList = async (req, res, next) => {
    try {
      const response = await this.#mediaService.getList(req);

      return res.status(200).json(response);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  #getGenres = async (req, res, next) => {
    try {
      console.log('here');
      const response = await this.#mediaService.getGenres(req);
      return res.status(200).json(response);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  #search = async (req, res, next) => {
    try {
      const response = await this.#mediaService.search(req);

      return res.status(200).json(response);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  #getDetail = async (req, res, next) => {
    try {
      const media = await this.#mediaService.getDetail(req);
      res.status(200).json(media);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}

export default MediaController;
