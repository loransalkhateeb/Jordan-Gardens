const express = require('express');
const router = express.Router();
const aboutController = require('../Controllers/aboutcontroller');
const multer = require('../Config/multer');   

router.post('/createabout', multer.single('image'), aboutController.createAbout);

router.get('/allaboutes/:lang', aboutController.getAllAbouts);


router.get('/getaboutbyid/:id/:lang', aboutController.getAboutById);


router.put('/updateabout/:id/:lang', multer.single('image'), aboutController.updateAbout);

router.delete('/deleteabout/:id', aboutController.deleteAbout);

module.exports = router;
