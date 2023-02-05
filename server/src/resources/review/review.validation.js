import authenticated from '../../middleware/authenticated.middleware.js';
import { body } from 'express-validator';
import validateHandler from '../../middleware/validation.middleware.js';

const create = (path, router, createReview) => {
  router.post(
    `${path}/`,
    authenticated.auth,
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
    body('mediaType')
      .exists()
      .withMessage('mediaType is required')
      .custom((type) => ['movie', 'tv'].includes(type))
      .withMessage('mediaType invalid'),
    body('mediaTitle').exists().withMessage('mediaTitle is required'),
    body('mediaPoster').exists().withMessage('mediaPoster is required'),
    validateHandler.validate,
    createReview
  );
};

export default { create };
