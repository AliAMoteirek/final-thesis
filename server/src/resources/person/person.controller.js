import { Router } from 'express';
import PersonService from './person.service.js';
import HttpException from '../../utils/exceptions/http.exception.js';

class PersonController {
  path = '/person';
  router = Router();
  personService = new PersonService();

  constructor() {
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    this.router.get(`${this.path}/`, (req, res) => {
      console.log('In Persons welcome page');
      res.status(200).json({ msg: 'Welcome' });
    });
    this.router.get(`${this.path}/:personId`, this.#personDetail);
    this.router.get(`${this.path}/:personId/medias`, this.#personMedias);
  }

  #personDetail = async (req, res, next) => {
    try {
      const person = await this.personService.personDetail(req);
      res.status(200).json(person);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  #personMedias = async (req, res, next) => {
    try {
      const medias = await this.personService.personMedias(req);
      res.status(200).json(medias);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}

export default PersonController;
