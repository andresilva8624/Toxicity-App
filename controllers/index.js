const router = require('express').Router();

const htmlRoutes = require('./html-routes.js');
const apiRoutes = require('./api');
const profileRoutes = require('./profileDash.js');

router.use('/', htmlRoutes);
router.use('/api', apiRoutes);
router.use('/profile',profileRoutes)


module.exports = router;