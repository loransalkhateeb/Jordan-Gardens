const Feedback = require('../Models/Feedback');


exports.createFeedback = async (req, res) => {
  try {
    const { description, lang } = req.body;
 
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const newFeedback = await Feedback.create({
      description,
      lang,
    });

    res.status(201).json({ message: 'Feedback created successfully', feedback: newFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create feedback' });
  }
};



exports.getAllFeedbacks = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const feedbacks = await Feedback.findAll({ where: { lang } });
  
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch FeedBack' });
    }
  };


  exports.getFeedBackById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const feedback = await Feedback.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!feedback) {
        return res.status(404).json({ error: 'feedback not found' });
      }
      res.status(200).json(feedback);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch feedback' });
    }
  };

  exports.updateFeedback = async (req, res) => {
    try {
      const { id } = req.params;
      const { description, lang } = req.body;
  

      if (!['ar', 'en'].includes(lang)) {
        return res.status(400).json({ error: lang === 'ar' ? 'Invalid language' : 'Invalid language' });
      }
  
     
      const feedback = await Feedback.findOne({
        where: { id, lang },
      });
  
      if (!feedback) {
        return res.status(404).json({ error: lang === 'ar' ? 'Feedback not found' : 'Feedback not found' });
      }
  
      
      feedback.description = description;
      feedback.lang = lang;
  
     
      await feedback.save();
  
      res.status(200).json({
        message: lang === 'ar' ? 'Feedback updated successfully' : 'Feedback updated successfully',
        feedback
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? ' Faild to updated the feedback' : 'Failed to update feedback'
      });
    }
  };
  




  exports.deleteFeedBack = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const feedback = await Feedback.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!feedback) {
        return res.status(404).json({ error: 'FeedBack not found for the specified language' });
      }
      await feedback.destroy();
      res.status(200).json({ message: 'FeedBack deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete FeedBack' });
    }
  };
  
