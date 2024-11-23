const express = require('express');
const router = express.Router();
const careersController = require('../Controllers/CareersController');


router.post('/createcareer', careersController.createCareer);


router.get('/getallcareers/:lang', careersController.getAllCareers);


router.get('/getcareerbyid/:id/:lang', careersController.getCareerById);


router.put('/updatecareer/:id/:lang', careersController.updateCareer);


router.delete('/deletecareer/:id/:lang', careersController.deleteCareer);

module.exports = router;
