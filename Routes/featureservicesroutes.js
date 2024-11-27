
const express = require('express');
const router = express.Router();
const featureServiceController = require('../Controllers/featureservicescontroller');
const multer = require('../Config/multer'); 


router.post('/createservicefeature', multer.single('image'), featureServiceController.createFeatureService);

router.get('/allservicefeature/:lang', featureServiceController.getAllServicesfeatures);


router.get('/featureservicesbyid/:id/:lang', featureServiceController.getFeatureServiceById);
router.get('/featureservicesbyservice_Id/:service_Id/:lang', featureServiceController.getFeatureServiceByservice_Id);


router.put('/updatefeatureservices/:id/:lang', multer.single('image'), featureServiceController.updateFeatureService);
router.put('/updatefeatureservicesnyserviceid/:service_id/:lang', multer.single('image'), featureServiceController.updateFeatureServicebyservice_id);


router.delete('/deletefeatureservices/:id/:lang', featureServiceController.deleteFeatureService);
router.delete('/deletefeatureservicesbyserviceid/:service_id/:lang', featureServiceController.deleteFeatureServiceByServiceId);

module.exports = router;
