const router = require('express').Router();
const matchRoutes = require('./match');

router.use(matchRoutes);
module.exports = router;