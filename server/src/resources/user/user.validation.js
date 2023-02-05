import { body } from 'express-validator';
import userModel from './user.model.js';
import validateHandler from '../../middleware/validation.middleware.js';
import authenticated from '../../middleware/authenticated.middleware.js';

const register = (path, router, signup) => {
  router.post(
    `${path}/signup`,
    body('username')
      .exists()
      .withMessage('username is required')
      .isLength({ min: 8 })
      .withMessage('username min 8 characters ')
      .custom(async (value) => {
        const user = await userModel.findOne({ username: value });
        if (user) return Promise.reject('username already used');
      }),
    body('password')
      .exists()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password min 8 characters '),
    body('confirmPassword')
      .exists()
      .withMessage('confirmPassword is required')
      .isLength({ min: 8 })
      .withMessage('confirmPassword min 8 characters ')
      .custom((value, { req }) => {
        if (value !== req.body.password)
          throw new Error('confirmPassword does not match');
        return true;
      }),
    body('displayName')
      .exists()
      .withMessage('displayName is required')
      .isLength({ min: 8 })
      .withMessage('displayName min 8 characters '),
    validateHandler.validate,
    signup
  );
};

const login = (path, router, signin) => {
  router.post(
    `${path}/signin`,
    body('username')
      .exists()
      .withMessage('username is required')
      .isLength({ min: 8 })
      .withMessage('username min 8 characters '),
    body('password')
      .exists()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password min 8 characters '),
    validateHandler.validate,
    signin
  );
};

const updatePassword = (path, router, signin) => {
  router.put(
    `${path}/update-password`,
    authenticated.auth,
    body('password')
      .exists()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password min 8 characters '),
    body('newPassword')
      .exists()
      .withMessage('newPassword is required')
      .isLength({ min: 8 })
      .withMessage('newPassword min 8 characters '),
    body('confirmNewPassword')
      .exists()
      .withMessage('confirmNewPassword is required')
      .isLength({ min: 8 })
      .withMessage('confirmNewPassword min 8 characters ')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword)
          throw new Error('confirmNewPassword does not match');
        return true;
      }),
    validateHandler.validate,
    signin
  );
};

const addFavorite = (path, router, addFavorite) => {
  router.post(
    `${path}/favorites`,
    authenticated.auth,
    body('mediaType')
      .exists()
      .withMessage('mediaType is required')
      .custom((type) => ['movie', 'tv'].includes(type))
      .withMessage('mediaType invalid'),
    body('mediaId')
      .exists()
      .withMessage('mediaId is required')
      .isLength({ min: 1 })
      .withMessage('mediaId can not be empty '),
    body('mediaTitle').exists().withMessage('mediaTitle is required'),
    body('mediaPoster').exists().withMessage('mediaPoster is required'),
    body('mediaRate').exists().withMessage('mediaRate is required'),
    validateHandler.validate,
    addFavorite
  );
};

export default { register, login, updatePassword, addFavorite };
