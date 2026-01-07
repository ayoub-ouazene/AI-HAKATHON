const router = require('express').Router();
const startupController = require('../controllers/startupController');
const verifyToken = require('../middlewares/authMiddleware');
const upload = require('../config/cloudinary');

// Update Profile (with Logo, Pitch Deck, CNRC)
router.put('/profile', 
  verifyToken, 
  upload.fields([
    { name: 'logo', maxCount: 1 }, 
    { name: 'pitchDeck', maxCount: 1 },
    { name: 'cnrc', maxCount: 1 }
  ]), 

  startupController.updateProfile
);

// Add Financials (with Proof Doc)
router.post('/financials', 
  verifyToken, 
  upload.fields([{ name: 'proofDocument', maxCount: 1 }]), 
  startupController.addFinancialRecord
);

router.get('/dashboard', verifyToken, startupController.getDashboard);

module.exports = router;