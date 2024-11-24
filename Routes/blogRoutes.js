const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/BlogController');  
const multer = require('../Config/multer'); 


router.post('/createblog', multer.array('image', 10), blogController.createBlog); 


router.get('/getallblogs/:lang', blogController.getAllBlogs);


router.get('/getblogbyid/:id/:lang', blogController.getBlogById);


router.put('/updateblog/:id/:lang', multer.single('image', 10), blogController.updateBlog);


router.delete('/deleteblog/:id/:lang', blogController.deleteBlog);

module.exports = router;
