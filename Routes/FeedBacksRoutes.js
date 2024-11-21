const express = require('express');
const router = express.Router();
const feedbackController = require('../Controllers/FeedBacksController');


router.post('/createfeedback', feedbackController.createFeedback);


router.get('/getallfeedbacks/:lang', feedbackController.getAllFeedbacks);


router.get('/getfeedbackbyid/:id/:lang', feedbackController.getFeedBackById);


router.put('/updatefeedback/:id/:lang', feedbackController.updateFeedback);


router.delete('/deletefeedback/:id/:lang', feedbackController.deleteFeedBack);

module.exports = router;
