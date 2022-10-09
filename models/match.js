"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.hasMany(models.MatchDetail, { foreignKey: "MatchId" });
      Match.belongsTo(models.User, { foreignKey: "UserId" });
      Match.belongsTo(models.Field, { foreignKey: "FieldId" });
      Match.belongsTo(models.Category, { foreignKey: "CategoryId" });
    }
  }
  Match.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name must be filled" },
          notEmpty: { msg: "name must be filled" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "location must be filled" },
          notEmpty: { msg: "location must be filled" },
        },
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "date must be filled" },
          notEmpty: { msg: "date must be filled" },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "sport category must be filled" },
          notEmpty: { msg: "sport category must be filled" },
        },
      },
      capacity: DataTypes.INTEGER,
      currentCapacity: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      duration: DataTypes.STRING,
      type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "match type must be filled" },
          notEmpty: { msg: "match type must be filled" },
        },
      },
      description: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      FieldId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Match",
    }
  );
  return Match;
};
