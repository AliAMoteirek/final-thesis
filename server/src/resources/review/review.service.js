import reviewModel from './review.model.js';

class ReviewService {
  async createReview(req) {
    try {
      const { movieId } = req.params;

      const review = new reviewModel({
        user: req.user.id,
        movieId,
        ...req.body,
      });

      await review.save();

      return {
        review: { ...review._doc },
        id: review.id,
        user: req.user,
      };
    } catch {
      throw new Error('Something went wrong!');
    }
  }

  async remove(req) {
    try {
      const { reviewId } = req.params;

      const review = await reviewModel.findOne({
        _id: reviewId,
        user: req.user.id,
      });

      if (!review) throw new Error('Unauthorized');

      await review.remove();
      return { msg: 'Review Removed' };
    } catch {
      throw new Error('Something went wrong!');
    }
  }

  async getReviewsOfUser(req) {
    try {
      const reviews = await reviewModel
        .find({ user: req.user.id })
        .sort('-createdAt');

      return reviews;
    } catch {
      throw new Error('Something went wrong!');
    }
  }
}

export default ReviewService;
