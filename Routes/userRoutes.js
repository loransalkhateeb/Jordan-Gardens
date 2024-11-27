const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const { route } = require('./CreateCareerRoutes');


router.post('/signup', userController.signup);
router.post('/createadmin',userController.createAdmin)

router.get('/allusers/:lang', userController.getAllUsers);


router.get('/getuserbyid/:id/:lang', userController.getUserById);


router.put('/update/:id/:lang', userController.updateUser);


router.delete('/deleteuser/:id', userController.deleteUser);


router.post('/login/:lang', userController.login);

router.post('/logout', userController.logout);

module.exports = router;
