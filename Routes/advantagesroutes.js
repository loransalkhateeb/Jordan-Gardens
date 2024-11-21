const express = require('express');
const router = express.Router();
const advantageController = require('../Controllers/advantagecontroller');


router.post('/createadvantages', advantageController.createAdvantage);


router.get('/getalladvantages/:lang', advantageController.getAllServicesadvantages);


router.get('/getadvantagesnbyid/:id/:lang', advantageController.getAdvantageById);


router.put('/updateadvantages/:id/:lang', advantageController.updateAdvantage);


router.delete('/deleteadvantages/:id/:lang', advantageController.deleteAdvantage);

module.exports = router;

