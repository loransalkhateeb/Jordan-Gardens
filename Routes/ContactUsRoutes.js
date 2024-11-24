const express = require('express');
const router = express.Router();
const contactUsController = require('../Controllers/ContactUsController');


router.post('/createcontactus', contactUsController.createContactUs);


router.get('/getallcontactus/:lang', contactUsController.getAllContactUs);


router.get('/getcontactusbyid/:id/:lang', contactUsController.getContactUsById);


router.put('/updatecontactus/:id/:lang', contactUsController.updateContactUs);


router.delete('/deletecontactus/:id/:lang', contactUsController.deleteContactUs);

module.exports = router;
