const router = require('express').Router();

const authRoutes = require('./auth.routes');
const startupRoutes = require('./startup.routes');
const dealRoutes = require('./deal.routes');
const investorRoutes = require('./investor.routes');

router.use('/auth', authRoutes);
router.use('/startup', startupRoutes);
router.use('/deals', dealRoutes);
router.use('/investor', investorRoutes); // Add later

module.exports = router;