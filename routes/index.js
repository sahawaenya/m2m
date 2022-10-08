const router = require("express").Router();
const userRoutes = require("./userRoute");
const fieldRoutes = require("./fieldRoute");

router.use(userRoutes);
router.use(fieldRoutes);
module.exports = router;
