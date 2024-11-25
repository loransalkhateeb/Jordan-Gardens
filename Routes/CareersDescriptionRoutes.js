const express = require('express');
const router = express.Router();
const careerDescriptionController = require('../Controllers/CareerDescriptionController');


router.post('/createcareerdescription', careerDescriptionController.createCareerDescription);


router.get('/getallcareerdescription/:lang', careerDescriptionController.getAllCareerDescriptions);


router.get('/getcareerdescriptionbyid/:id/:lang', careerDescriptionController.getCareerDescriptionById);
router.get('/getcareerdescriptionbycareer_id/:career_id/:lang', careerDescriptionController.getCareerDescriptionByCareer_Id);

router.put('/careerdescriptionupdate/:id/:lang', careerDescriptionController.updateCareerDescription);
router.put('/careerdescriptionupdatebycareerid/:career_id/:lang', careerDescriptionController.updateCareerDescriptionByCareerId);


router.delete('/deletecareerdescription/:id/:lang', careerDescriptionController.deleteCareerDescription);
router.delete('/deletecareerdescriptionbycareerid/:career_id/:lang', careerDescriptionController.deleteCareerDescriptionByCareerId);

module.exports = router;
