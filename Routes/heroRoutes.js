const express = require('express');
const router = express.Router();
const heroController = require('../Controllers/heroController');
const multer = require('../Config/multer');  


router.post('/createhero', multer.single('image'), heroController.createHero);

router.get('/allheros/:lang', heroController.getAllHeroes);

router.get('/getherobyid/:lang/:id', heroController.getHeroById);


router.put('/updatehero/:lang/:id', multer.single('image'), heroController.updateHero);

router.delete('/deletehero/:lang/:id', heroController.deleteHero);

module.exports = router;
