const { Field, Category } = require("../models");

class FieldController {
  static async getFields(req, res, next) {
    try {
      const whereClause = {};
      const { category } = req.query;

      if (category) {
        whereClause.CategoryId = Number(category);
      }

      const fields = await Field.findAll({
        include: Category,
        where: whereClause,
      });
      res.status(200).json(fields);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = FieldController;
