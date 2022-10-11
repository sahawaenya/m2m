const MatchController = require("../controllers/match");
const router = require("express").Router();
const authHandler = require('../middleware/authHandler');

router.post("/matches",authHandler, MatchController.addMatch);
router.delete("/matches/:matchId",authHandler, MatchController.deleteMatch);
router.get('/matches',authHandler, MatchController.getAllMatches);
router.get('/matches/:matchId',authHandler, MatchController.getMatchesById);
router.post('/matches/:matchId/join',authHandler, MatchController.joinMatches);
router.get('/matches/:matchId/participants',authHandler, MatchController.showRequestParticipants);
router.patch('/matches/:matchId/participants/:participantId',authHandler, MatchController.changeRequestParticipantsStatus);
router.delete('/matches/:matchId/leave',authHandler, MatchController.leaveMatch);

module.exports = router;
