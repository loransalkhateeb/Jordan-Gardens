const express = require('express');
const router = express.Router();
const termsAndConditionsController = require('../Controllers/TermsAndConditionsController');


router.post('/createtermsAndConditions', termsAndConditionsController.createTermsAndConditions);


router.get('/getalltermsAndConditions/:lang', termsAndConditionsController.getTermsAndConditions);


router.get('/gettermsAndConditionsbyid/:id/:lang', termsAndConditionsController.getTermsAndConditionsById);


router.put('/updatetermsAndConditions/:id/:lang', termsAndConditionsController.updateTermsAndConditions);


router.delete('/deletetermsAndConditions/:id/:lang', termsAndConditionsController.deletetermsAndConditions);

module.exports = router;
