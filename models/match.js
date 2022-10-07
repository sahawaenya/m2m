'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Match.hasMany(models.MatchDetail, {foreignKey: 'MatchId'});
      Match.belongsTo(models.User, {foreignKey: 'UserId'});
      Match.belongsTo(models.Field, {foreignKey: 'FieldId'});
      Match.belongsTo(models.Category, {foreignKey: 'CategoryId'});
    }
  }
  Match.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    date: DataTypes.DATE,
    CategoryId: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    currentCapacity: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    duration: DataTypes.STRING,
    type: DataTypes.INTEGER,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER,
    FieldId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Match',
  });
  return Match;
};