const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/BlogController');  
const multer = require('../Config/multer'); 


router.post('/createblog', multer.single('image'), blogController.createBlog); 


router.get('/getallblogs/:lang', blogController.getAllBlogs);


router.get('/getblogbyid/:id/:lang', blogController.getBlogById);


router.put('/updateblog/:id/:lang', multer.single('image'), blogController.updateBlog);


router.delete('/deleteblog/:id/:lang', blogController.deleteBlog);

module.exports = router;
