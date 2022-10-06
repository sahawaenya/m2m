'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventDetail.belongsTo(models.Event, {foreignKey: 'EventId'});
      EventDetail.belongsTo(models.User, {foreignKey: 'UserId'});
    }
  }
  EventDetail.init({
    EventId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventDetail',
  });
  return EventDetail;
};