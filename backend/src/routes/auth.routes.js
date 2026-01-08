const router = require('express').Router();
const authController = require('../controllers/authController');
const upload = require('../config/cloudinary');


router.post('/signup/startup',
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'pitchDeck', maxCount: 1 },
    { name: 'videoPitch', maxCount: 1 },
    { name: 'cnrc', maxCount: 1 }
  ]),
  authController.registerStartup
);

router.post('/signup/investor', authController.registerInvestor);
router.post('/login', authController.login);

module.exports = router;