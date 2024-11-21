
const express = require('express');
const router = express.Router();
const serviceController = require('../Controllers/servicescontroller');
const multer = require('../Config/multer'); 


router.post('/createservice', multer.single('image'), serviceController.createService);


router.get('/allservices/:lang', serviceController.getAllServices);


router.get('/getservicebyid/:id/:lang', serviceController.getServiceById);


router.put('/updateservice/:id/:lang', multer.single('image'), serviceController.updateService);


router.delete('/deleteservice/:id/:lang', serviceController.deleteService);

module.exports = router;
