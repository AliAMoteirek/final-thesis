import userModel from './user.model.js';
import accessToken from '../../utils/token.js';

class UserService {
  async signup(username, password, displayName) {
    try {
      const checkUser = await userModel.findOne({ username });

      if (checkUser) throw new Error('username already used');

      const user = new userModel();

      user.displayName = displayName;
      user.username = username;
      user.setPassword(password);

      await user.save();

      const token = accessToken.createToken(user);

      return { token, user: user._doc, id: user.id };
    } catch (error) {
      throw new Error('Unable to create user');
    }
  }

  async singin(username, password) {
    try {
      const user = await userModel
        .findOne({ username })
        .select('username password salt id displayName');

      if (!user) throw new Error('User does not exist');

      if (!user.validPassword(password)) throw new Error('Wrong password');

      const token = accessToken.createToken(user);

      user.password = undefined;
      user.salt = undefined;

      return { token, user: user._doc, id: user.id };
    } catch (error) {
      throw new Error('Unable sign in');
    }
  }
}

export default UserService;
