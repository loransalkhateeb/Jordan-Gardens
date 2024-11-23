const express = require('express');
const router = express.Router();
const ChooseCompanyController = require('../Controllers/ChooeseCompanyController');
const multer = require('../Config/multer');  


router.post('/createchoosecompany', multer.single('image'), ChooseCompanyController.createChooseCompany);

router.get('/allchoosecompanies/:lang', ChooseCompanyController.getAllChoosesCompany);

router.get('/getchoosecompanybyid/:lang/:id', ChooseCompanyController.getchoosecompayById);

router.put('/updatechoosecompany/:lang/:id', multer.single('image'), ChooseCompanyController.updateChooseCompany);

router.delete('/deletechoosecompany/:lang/:id', ChooseCompanyController.deleteChooseCompany);

module.exports = router;
