
const express = require('express');
const router = express.Router();
const featureServiceController = require('../Controllers/featureservicescontroller');
const multer = require('../Config/multer'); 


router.post('/createservicefeature', multer.single('image'), featureServiceController.createFeatureService);


router.get('/allservicefeature/:lang', featureServiceController.getAllServicesfeatures);


router.get('/featureservicesbyid/:id/:lang', featureServiceController.getFeatureServiceById);


router.put('/updatefeatureservices/:id/:lang', multer.single('image'), featureServiceController.updateFeatureService);


router.delete('/deletefeatureservices/:id/:lang', featureServiceController.deleteFeatureService);

module.exports = router;
