const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware'); 


const slidesController = require('../controllers/slidesController');


//http://localhost:3000/api/slides/generate
router.get('/generate', verifyToken , slidesController.generateSlidesFromPitch);

module.exports = router;
