const MatchController = require("../controllers/match");
const router = require("express").Router();
const authHandler = require('../middleware/authHandler');

router.use(authHandler);
router.post("/matches", MatchController.addMatch);
router.delete("/matches/:matchId", MatchController.deleteMatch);
router.get('/matches', MatchController.getAllMatches);
router.get('/matches/:matchId', MatchController.getMatchesById);
router.post('/matches/:matchId/join', MatchController.joinMatches);
router.get('/matches/:matchId/participants', MatchController.showRequestParticipants);
router.patch('/matches/:matchId/participants/:participantId', MatchController.changeRequestParticipantsStatus);

module.exports = router;
