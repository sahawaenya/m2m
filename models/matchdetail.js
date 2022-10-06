'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MatchDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MatchDetail.belongsTo(models.Event, {foreignKey: 'MatchId'});
      MatchDetail.belongsTo(models.User, {foreignKey: 'UserId'});
    }
  }
  MatchDetail.init({
    MatchId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MatchDetail',
  });
  return MatchDetail;
};