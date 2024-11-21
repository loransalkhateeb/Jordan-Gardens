const express = require('express');
const router = express.Router();
const privacypolicyController = require('../Controllers/PrivacyPolicyController');


router.post('/createprivacypolicy', privacypolicyController.createPrivacyPolicy);


router.get('/getallprivacypolicy/:lang', privacypolicyController.getAllPrivacyPolicy);


router.get('/getprivacypolicybyid/:id/:lang', privacypolicyController.getPrivacyPolicyById);


router.put('/updateprivacypolicy/:id/:lang', privacypolicyController.updateprivacypolicy);


router.delete('/deleteprivacypolicy/:id/:lang', privacypolicyController.deletePrivacyPolicy);

module.exports = router;
