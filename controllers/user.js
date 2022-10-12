const { comparePassword } = require("../helpers/bcrypt");
const CustomError = require("../helpers/customError");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userLog = await User.findOne({ where: { email } });
      // console.log(userLog, "<<< ini userLog");
      if (!userLog) {
        throw new CustomError("invalid email/password", "Bad Request", 400);
      }
      const validateUser = comparePassword(password, userLog.password);
      if (!validateUser) {
        throw new CustomError("invalid email/password", "Bad Request", 400);
      }
      const payload = { id: userLog.id };
      const access_token = createToken(payload);
      res
        .status(200)
        .json({ access_token, id: userLog.id, name: userLog.name });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, bio } = req.body;

      const registerUser = await User.create({ name, email, password, bio });
      res.status(201).json({
        message: `successfully register user with id ${registerUser.id}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
