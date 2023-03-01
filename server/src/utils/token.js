import jwt from 'jsonwebtoken';

export const createToken = (user) => {
  const secret = process.env.JWT_SECRET;
  return jwt.sign({ id: user._id }, secret, {
    expiresIn: '1d',
  });
};

export const verifyToken = async (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) return reject(err);

      resolve(payload);
    });
  });
};

export default { createToken, verifyToken };
