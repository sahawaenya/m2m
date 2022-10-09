"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.MatchDetail, { foreignKey: "UserId" });
      User.hasMany(models.Match, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name must be filled",
          },
          notEmpty: {
            msg: "name must be filled",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "email must be filled",
          },
          notEmpty: {
            msg: "email must be filled",
          },
          isEmail: {
            msg: "must be email format",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notNull: {
            msg: "password must be filled",
          },
          notEmpty: {
            msg: "password must be filled",
          },
        },
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "bio must be filled",
          },
          notEmpty: {
            msg: "bio must be filled",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user, option) => {
    user.password = hashPassword(user.password);
  });
  return User;
};
