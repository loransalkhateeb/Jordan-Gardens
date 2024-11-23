const CareersModel = require('../Models/Careers');



exports.createCareer = async (req, res) => {
    try {
      const { position, numberOfPositions, location, experience, lang } = req.body;
  
   
      if (!['ar', 'en'].includes(lang)) {
        return res.status(400).json({ error: lang === 'ar' ? 'Invalid Language' : 'Invalid language' });
      }
  
   
      const career = await CareersModel.create({
        position,
        numberOfPositions,
        location,
        experience,
        lang,
      });
  
      res.status(201).json({
        message: lang === 'ar' ? 'Career Created Successfully' : 'Career created successfully',
        career,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'Faild To Create Career' : 'Failed to create career',
      });
    }
  };
  


  exports.getAllCareers = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const career = await CareersModel.findAll({ where: { lang } });
  
      res.status(200).json(career);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch Career' });
    }
  };


  exports.getCareerById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const career = await CareersModel.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!career) {
        return res.status(404).json({ error: 'career not found' });
      }
      res.status(200).json(career);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch career' });
    }
  };
  

  exports.updateCareer = async (req, res) => {
    try {
      const { id } = req.params; 
      const { position, numberOfPositions, location, experience, lang } = req.body; 
  

      if (lang && !['ar', 'en'].includes(lang)) {
        return res.status(400).json({
          error: lang === 'ar' ? 'Invalid Language' : 'Invalid language',
        });
      }
  

      const career = await CareersModel.findOne({
        where: { id },
      });
  
      if (!career) {
        return res.status(404).json({
          error: lang === 'ar' ? 'Career Not Found' : 'Career not found',
        });
      }
  
 
      if (position !== undefined) career.position = position;
      if (numberOfPositions !== undefined) career.numberOfPositions = numberOfPositions;
      if (location !== undefined) career.location = location;
      if (experience !== undefined) career.experience = experience;
      if (lang !== undefined) career.lang = lang;
  

      await career.save();
  
      res.status(200).json({
        message: lang === 'ar' ? 'Career Updated Sucessfully' : 'Career updated successfully',
        career,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? 'Faild To update Career' : 'Failed to update career',
      });
    }
  };
  
  
  


  exports.deleteCareer = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const career = await CareersModel.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!career) {
        return res.status(404).json({ error: 'career not found for the specified language' });
      }
      await career.destroy();
      res.status(200).json({ message: 'Career deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Career' });
    }
  };
  
  
