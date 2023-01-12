import responseHandler from '../handlers/responseHandler.js';
import favoritModel from '../models/favoritModel.js';

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoritModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });

    if (isFavorite) return responseHandler.ok(res, isFavorite);

    const favorite = new favoritModel({
      ...req.body,
      user: req.user.id,
    });

    await favorite.save();

    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoritModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    if (!favorite) return responseHandler.notfound(res);

    await favorite.remove();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getFavortiesOfUser = async (req, res) => {
  try {
    const favorite = await favoritModel
      .find({ user: req.user.id })
      .sort('-createdAt');

    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(re);
  }
};

export default {
  addFavorite,
  removeFavorite,
  getFavortiesOfUser,
};
