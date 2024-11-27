const AllContents = require('../Models/AllContents');


exports.createContent = async (req, res) => {
  try {
    const { title, link, lang } = req.body;

    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language, must be "ar" or "en"' });
    }

    const newContent = await AllContents.create({
      title,
      link,
      lang
    });

    res.status(201).json({
      message: 'Content created successfully',
      content: newContent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create content' });
  }
};


exports.getAllContents = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const contents = await AllContents.findAll({ where: { lang } });
  
      res.status(200).json(contents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch contents' });
    }
  };


  exports.getContentsById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const content = await AllContents.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!content) {
        return res.status(404).json({ error: 'Contents not found' });
      }
      res.status(200).json(content);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch Contents' });
    }
  };
  

  exports.updateContent = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, link, lang } = req.body;
  
     
      if (!['ar', 'en'].includes(lang)) {
        return res.status(400).json({
          error: lang === 'ar' ? 'اللغة غير صالحة' : 'Invalid language'
        });
      }
  
    
      let content = await AllContents.findOne({
        where: { id, lang }
      });
  
      
      if (!content) {
      
        content = await AllContents.findOne({
          where: { id }
        });
  
        if (!content) {
          return res.status(404).json({
            error: lang === 'ar' ? 'The content is not defind' : 'Content not found'
          });
        }
  
        
        content.lang = lang;  
      }
  
     
      content.title = title || content.title; 
      content.link = link || content.link; 
  
      
      await content.save();
  
      res.status(200).json({
        message: lang === 'ar' ? 'The Contnet Updated Successfully' : 'Content updated successfully',
        content
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'Failed to update content' : 'Failed to update content'
      });
    }
  };
  

  exports.deleteContents = async (req, res) => {
    try {
      const { id, lang } = req.params;
  
    
      if (!['ar', 'en'].includes(lang)) {
        return res.status(400).json({ error: lang === 'ar' ? 'Invalid Language' : 'Invalid language' });
      }
  
    
      const content = await AllContents.findOne({
        where: { id, lang },
      });
  
      if (!content) {
       
        return res.status(404).json({
          error: lang === 'ar' ? 'Content not found for the specefield language' : 'Content not found for the specified language',
        });
      }
  
 
      await content.destroy();
  

      res.status(200).json({
        message: lang === 'ar' ? 'Content Deleted Successfully' : 'Content deleted successfully',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'Faild To Delete Content' : 'Failed to delete content',
      });
    }
  };
  