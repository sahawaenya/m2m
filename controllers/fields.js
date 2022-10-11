const { Field, Category } = require("../models");

class FieldController {
  static async getFields(req, res, next) {
    try {
      const fields = await Field.findAll({ include: Category });
      res.status(200).json(fields);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = FieldController;
