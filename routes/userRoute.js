const UserController = require("../controllers/user");

const router = require("express").Router();

router.post("/login", UserController.login);
router.post("/register", UserController.register);
module.exports = router;
