const router = require('express').Router();
const MatchController = require('../controllers/MatchController');

router.get('/matches', MatchController.index);
router.get('/matches/:matchId', MatchController.findById);
router.post('/matches/:matchId/join', MatchController.joinMatches);
router.get('/matches/:matchId/participants', MatchController.showRequestParticipants);
router.patch('/matches/:matchId/participants/:participantId', MatchController.changeRequestParticipantsStatus);
module.exports = router;