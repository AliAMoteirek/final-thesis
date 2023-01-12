import express from 'express';
import { body } from 'express-validator';
import reviewController from '../controllers/reviewController.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';
import requestHandler from '../handlers/requestHandler.js';

const router = express.Router({ mergeParams: true });

router.get('/', tokenMiddleware.auth, reviewController.getReviewsOfUser);

router.post(
  '/',
  tokenMiddleware.auth,
  body('mediaId')
    .exists()
    .withMessage('mediaId is required')
    .isLength({ min: 1 })
    .withMessage('mediaId can not be empty'),
  body('content')
    .exists()
    .withMessage('content is required')
    .isLength({ min: 1 })
    .withMessage('content can not be empty'),
  body('mediatype')
    .exists()
    .withMessage('mediatype is required')
    .custom((type) => ['movie', 'tv'].includes(type))
    .withMessage('mediaType invalid'),
  body('mediatitle').exists().withMessage('mediatitle is required'),
  body('mediaPoster').exists().withMessage('mediaPoster is required'),
  requestHandler.validate,
  reviewController.createReview
);

router.delete('/:reviewId', tokenMiddleware.auth, reviewController.remove);

export default router;
