import express from 'express';
import { body } from 'express-validator';
import favoriteController from '../controllers/favoritController.js';
import userController from '../controllers/userController.js';
import requestHandler from '../handlers/requestHandler.js';
import userModel from '../models/userModel.js';
import tokenMiddleware from '../middlewares/tokenMiddleware.js';

const router = express.Router();

router.post(
  '/signup',
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
  requestHandler.validate,
  userController.signup
);

router.post(
  '/signin',
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
  requestHandler.validate,
  userController.signin
);

router.put(
  '/update-password',
  tokenMiddleware.auth,
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
  requestHandler.validate,
  userController.updatePassword
);

router.get('/info', tokenMiddleware.auth, userController.getInfo);

router.get(
  '/favorites',
  tokenMiddleware.auth,
  favoriteController.getFavortiesOfUser
);

router.post(
  '/favorites',
  tokenMiddleware.auth,
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
  requestHandler.validate,
  favoriteController.addFavorite
);

router.delete(
  '/favorites/:favoriteId',
  tokenMiddleware.auth,
  favoriteController.removeFavorite
);

export default router;
