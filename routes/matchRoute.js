const MatchController = require("../controllers/match");
const router = require("express").Router();

router.post("/matches", MatchController.addMatch);
router.delete("/matches/:matchId");

module.exports = router;
