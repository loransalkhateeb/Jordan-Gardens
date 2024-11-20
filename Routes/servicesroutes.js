const express = require('express');
const router = express.Router();
const servicecontroller = require('../Controllers/servicescontroller');
const multer = require('../Config/multer');  


router.post('/createservice', multer.single('image'), servicecontroller.createService);


router.get('/allservices/:lang', servicecontroller.getAllServices);


router.get('/getservicebyid/:lang/:id', servicecontroller.getServiceById);


router.put('/updateservice/:lang/:id', multer.single('image'), servicecontroller.updateService);


router.delete('/deleteservice/:lang/:id', servicecontroller.deleteService);

module.exports = router;
