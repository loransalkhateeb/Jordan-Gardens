const express = require('express');
const router = express.Router();
const aboutController = require('../Controllers/aboutcontroller');
const multer = require('../Config/multer');   

router.post('/createabout', multer.single('image'), aboutController.createAbout);

router.get('/allaboutes/:lang', aboutController.getAllAbouts);


router.get('/get/:id/:lang', aboutController.getAboutById);


router.put('/update/:id/:lang', multer.single('image'), aboutController.updateAbout);

router.delete('/delete/:id', aboutController.deleteAbout);

module.exports = router;
