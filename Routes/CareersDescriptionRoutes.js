const express = require('express');
const router = express.Router();
const careerDescriptionController = require('../Controllers/CareerDescriptionController');


router.post('/createcareerdescription', careerDescriptionController.createCareerDescription);


router.get('/getallcareerdescription/:lang', careerDescriptionController.getAllCareerDescriptions);


router.get('/getcareerdescriptionbyid/:id/:lang', careerDescriptionController.getCareerDescriptionById);


router.put('/careerdescriptionupdate/:id/:lang', careerDescriptionController.updateCareerDescription);


router.delete('/deletecareerdescription/:id/:lang', careerDescriptionController.deleteCareerDescription);

module.exports = router;
