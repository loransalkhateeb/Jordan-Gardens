const LogoModel = require('../Models/LogoModel');


exports.createLogo = async (req, res) => {
    try {
      const { description, lang } = req.body;
      let imageUrl = null;
  
      if (req.file) {
        imageUrl = req.file.filename;  
      }
  
      const newLogo = await LogoModel.create({
        description,
        lang,
        image: imageUrl,
      });
  
      res.status(201).json({ message: 'Logo created successfully', hero: newLogo });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Logo'});
    }
  };


exports.getAllLogos = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const logo = await LogoModel.findAll({ where: { lang } });
  
      res.status(200).json(logo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch Logo' });
    }
  };


  exports.getLogoById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const logo = await LogoModel.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!logo) {
        return res.status(404).json({ error: 'logo not found' });
      }
      res.status(200).json(logo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch logo' });
    }
  };



  exports.updatelogo = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, lang } = req.body;
      
     
      const image = req.files ? req.files[0].filename : null;  
  
     
      const logo = await LogoModel.findByPk(id);
  
      if (!logo) {
        return res.status(404).json({ error: 'Logo not found' });
      }
  
    
      logo.title = title || logo.title;  
      logo.lang = lang || logo.lang;  
      logo.images = image || logo.images; 
  
      
      await logo.save();
  
     
      res.status(200).json({ message: 'Logo updated successfully', logo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update logo' });
    }
  };
  
  




  exports.deletelogo = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const logo = await LogoModel.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!logo) {
        return res.status(404).json({ error: 'logo not found for the specified language' });
      }
      await logo.destroy();
      res.status(200).json({ message: 'logo deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete logo' });
    }
  };
  
