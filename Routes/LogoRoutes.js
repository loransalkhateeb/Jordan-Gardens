const express = require('express');
const router = express.Router();
const logoController = require('../Controllers/LogoController');  
const multer = require('../Config/multer'); 


router.post('/createLogo', multer.single('image'), logoController.createLogo); 


router.get('/getalllogos/:lang', logoController.getAllLogos);


router.get('/getlogobyid/:id/:lang', logoController.getLogoById);


router.put('/updatelogo/:id/:lang', multer.single('image'), logoController.updatelogo);


router.delete('/deletelogo/:id/:lang', logoController.deletelogo);

module.exports = router;
