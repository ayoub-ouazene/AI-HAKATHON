const router = require('express').Router();
const investorController = require('../controllers/investorController');
const verifyToken = require('../middlewares/authMiddleware'); // Check if folder is 'middleware' or 'middlewares'
const upload = require('../config/cloudinary');

// Update Profile
// We keep the upload middleware here so the request doesn't fail if you send a file,
// even though we don't save the URL to the DB yet.
router.put('/profile', 
  verifyToken, 
  upload.fields([{ name: 'avatar', maxCount: 1 }]), 
  investorController.updateProfile
);

// Post a new Opportunity
router.post('/opportunity', verifyToken, investorController.createOpportunity);

// Get my Portfolio/Offers
// This matches 'exports.getMyPortfolio' in the controller
router.get('/portfolio', verifyToken, investorController.getPortfolioDashboard);

router.post('/make-offer', verifyToken, investorController.createInvestmentOffer);



module.exports = router;