import { Router } from 'express';
import authenticated from '../../middleware/authenticated.middleware.js';
import reviewValidation from './review.validation.js';
import HttpException from '../../utils/exceptions/http.exception.js';
import ReviewService from './review.service.js';

class ReviewController {
  path = '/reviews';
  router = Router({ mergeParams: true });
  reviewService = new ReviewService();

  constructor() {
    this.#initialiseRoutes();
  }

  #initialiseRoutes() {
    reviewValidation.create(this.path, this.router, this.#createReview);
    this.router.get(
      `${this.path}/`,
      authenticated.auth,
      this.#getReviewsOfUser
    );
    this.router.delete(
      `${this.path}/:reviewId`,
      authenticated.auth,
      this.#remove
    );
  }

  #createReview = async (req, res, next) => {
    try {
      const { review, id, user } = await this.reviewService.createReview(req);
      res.status(201).json({ ...review, id, user });
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  #remove = async (req, res, next) => {
    try {
      const { msg } = await this.reviewService.remove(req);
      res.status(200).json(msg);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };

  #getReviewsOfUser = async (req, res, next) => {
    try {
      const reviews = await this.reviewService.getReviewsOfUser(req);
      res.status(200).json(reviews);
    } catch (error) {
      next(new HttpException(500, error.message));
    }
  };
}

export default ReviewController;
