import favoriteModel from './favorite.model.js';

class FavoriteService {
  addFavorite = async (req, res) => {
    try {
      const isFavorite = await favoriteModel.findOne({
        user: req.user.id,
        mediaId: req.body.mediaId,
      });

      if (isFavorite) return res.status(200).json(isFavorite);

      const favorite = new favoriteModel({
        ...req.body,
        user: req.user.id,
      });

      await favorite.save();

      res.status(201).json(favorite);
    } catch {
      res.status(500).json({
        status: 500,
        message: 'Something went wrong!',
      });
    }
  };

  removeFavorite = async (req, res) => {
    try {
      const { favoriteId } = req.params;

      const favorite = await favoriteModel.findOne({
        user: req.user.id,
        _id: favoriteId,
      });

      if (!favorite)
        return res
          .status(404)
          .json({ status: 404, message: 'Resource not found!' });

      await favorite.remove();

      res.status(200).json('Removed from favorites');
    } catch {
      res.status(500).json({
        status: 500,
        message: 'Something went wrong!',
      });
    }
  };

  getFavortiesOfUser = async (req, res) => {
    try {
      const favorite = await favoriteModel
        .find({ user: req.user.id })
        .sort('-createdAt');

      res.status(200).json(favorite);
    } catch {
      res.status(500).json({
        status: 500,
        message: 'Something went wrong!',
      });
    }
  };
}

export default FavoriteService;
