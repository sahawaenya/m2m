const router = require("express").Router();
const userRoutes = require("./userRoute");
const fieldRoutes = require("./fieldRoute");
const matchRoutes = require("./matchRoute");
const categoryRoutes = require('./categoryRoute');
const errorHandler = require('../middleware/errorHandler');

router.use(userRoutes);
router.use(fieldRoutes);
router.use(matchRoutes);
router.use(categoryRoutes);
router.use(errorHandler);
module.exports = router;
