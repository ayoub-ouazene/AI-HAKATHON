const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware'); 


const slidesController = require('../controllers/slidesController');


//http://localhost:3000/api/slides/SlideGenerate
router.get('/SlideGenerate', verifyToken , slidesController.generateSlidesFromPitch);

module.exports = router;
