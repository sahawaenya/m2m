const {Category} = require('../models');

class CategoryController {
  static async index(req, res, next) {
    try{
      const categories = await Category.findAll();
      res.status(200).json(categories);
    }catch (e) {
      next(e);
    }
  }
}

module.exports = CategoryController;
