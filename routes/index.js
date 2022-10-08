const router = require("express").Router();
const userRoutes = require("./userRoute");
const fieldRoutes = require("./fieldRoute");
const matchRoutes = require("./matchRoute");

router.use(userRoutes);
router.use(fieldRoutes);
router.use(matchRoutes);
module.exports = router;
