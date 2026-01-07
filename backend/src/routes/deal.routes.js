const router = require('express').Router();
const dealController = require('../controllers/dealController');
const verifyToken = require('../middlewares/authMiddleware');

// Startup creates a post
router.post('/create', verifyToken, dealController.createPost);

// Investor sees feed
router.get('/feed', dealController.getAllDeals);

// Investor makes offer
router.post('/offer', verifyToken, dealController.makeOffer);

module.exports = router;