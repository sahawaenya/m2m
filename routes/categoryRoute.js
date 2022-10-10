const router = require('express').Router();
const CategoryController = require('../controllers/category');

router.get('/categories', CategoryController.index);
module.exports = router;