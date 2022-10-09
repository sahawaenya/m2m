const FieldController = require("../controllers/fields");
const router = require("express").Router();

router.get("/fields", FieldController.getFields);

module.exports = router;
