import { verifyToken } from '../utils/token.js';
import UserModel from '../resources/user/user.model.js';
import HttpException from '../utils/exceptions/http.exception.js';
import jwt from 'jsonwebtoken';

async function auth(req, res, next) {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Unauthorized'));
  }

  const accessToken = bearer.split('Bearer ')[1].trim();
  try {
    const payload = await verifyToken(accessToken);

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    const user = await UserModel.findById(payload.id)
      .select('-password')
      .exec();

    if (!user) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new HttpException(401, 'Unauthorized'));
  }
}

const tokenDecode = (req) => {
  try {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1];
      const secret = process.env.JWT_SECRET;
      return jwt.verify(token, secret);
    }
    return false;
  } catch {
    return false;
  }
};

export default { auth, tokenDecode };
