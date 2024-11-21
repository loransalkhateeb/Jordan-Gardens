const express = require('express');
const router = express.Router();
const projectImagesController = require('../Controllers/ProjectsImages');


router.post('/createprojectsimages', projectImagesController.createProjectImage);


router.get('/project-images', projectImagesController.getAllProjectImages);


router.get('/project-images/:id', projectImagesController.getProjectImageById);


router.put('/project-images/:id', projectImagesController.updateProjectImage);


router.delete('/project-images/:id', projectImagesController.deleteProjectImage);

module.exports = router;
