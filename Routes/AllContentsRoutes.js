const express = require('express');
const router = express.Router();
const contentsController = require('../Controllers/AllContentsController');


router.post('/createcontent', contentsController.createContent);


router.get('/getallcontents/:lang', contentsController.getAllContents);


router.get('/getcontentbyid/:id/:lang', contentsController.getContentsById);


router.put('/updatecontents/:id/:lang', contentsController.updateContent);


router.delete('/deletecontents/:id/:lang', contentsController.deleteContents);

module.exports = router;
