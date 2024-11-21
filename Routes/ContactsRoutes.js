const express = require('express');
const router = express.Router();
const contactsController = require('../Controllers/ContactsController');  
const multer = require('../Config/multer'); 


router.post('/createcontact', multer.single('icon'), contactsController.createContact);


router.get('/getallcontacts/:lang', contactsController.getAllContacts);


router.get('/getcontactbyid/:id/:lang', contactsController.getContactById);


router.put('/updatecontact/:id/:lang',multer.single('icon'), contactsController.updateContact);


router.delete('/deletecontact/:id/:lang', contactsController.deleteContact);

module.exports = router;
