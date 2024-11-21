const express = require('express');
const router = express.Router();
const projectController = require('../Controllers/projectscontroller');  
const multer = require('../Config/multer'); 


router.post('/createproject', multer.array('image', 10), projectController.createProject); 


router.get('/getallprojects/:lang', projectController.getAllProjects);


router.get('/getprojectbyid/:id/:lang', projectController.getProjectById);


router.put('/updateproject/:id/:lang', multer.array('image', 10), projectController.updateProject);


router.delete('/deleteproject/:id/:lang', projectController.deleteProject);

module.exports = router;
