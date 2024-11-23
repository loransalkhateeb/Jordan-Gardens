const express = require('express');
const router = express.Router();
const logoController = require('../Controllers/LogoController');  
const multer = require('../Config/multer'); 


router.post('/createLogo', multer.array('image', 10), logoController.createLogo); 


router.get('/getalllogos/:lang', logoController.getAllLogos);


router.get('/getlogobyid/:id/:lang', logoController.getLogoById);


router.put('/updatelogo/:id/:lang', multer.array('image', 10), logoController.updatelogo);


router.delete('/deletelogo/:id/:lang', logoController.deletelogo);

module.exports = router;
