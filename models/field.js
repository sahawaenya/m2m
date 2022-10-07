'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Field extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Field.belongsTo(models.Category, {foreignKey: 'CategoryId'});
      Field.hasMany(models.Match, {foreignKey: 'FieldId'});
    }
  }
  Field.init({
    name: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    location: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    CategoryId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    openHour: DataTypes.STRING,
    closeHour: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Field',
  });
  return Field;
};