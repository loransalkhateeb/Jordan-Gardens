const express = require('express');
const router = express.Router();
const CreateCareerController = require('../Controllers/CreateCareerController');
const multer = require('../Config/multer'); 


router.post('/createcareer', multer.single('uploadCv'), CreateCareerController.createCareer);


router.get('/allcareer', CreateCareerController.getAllCVs);


router.get('/careerbyid/:id/:lang', CreateCareerController.getCareerById);


router.get('/careerbycareerid/:careerId/:lang', CreateCareerController.getCareerById);


router.put('/updatecareer/:id/:lang', multer.single('uploadCv'), CreateCareerController.updateCareer);




router.delete('/deletecareerbycareerid/:careerId/:lang', CreateCareerController.deleteCareer);

module.exports = router;
