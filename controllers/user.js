const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userLog = await User.findOne({ where: { email } });
      if (!userLog) {
        throw new Error("invalid email/password");
      }
      const validateUser = comparePassword(password, userLog.password);
      if (!validateUser) {
        throw new Error("invalid email/password");
      }
      const payload = { id: userLog.id };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      res.send({ error });
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, bio } = req.body;
      console.log(name, email, password, bio, "<<< ini body");
      const registerUser = await User.create({ name, email, password, bio });
      res.status(201).json({
        message: `successfully register user with id ${registerUser.id}`,
      });
    } catch (error) {
      res.send(error);
      console.log(error);
    }
  }
}

module.exports = UserController;
