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
    const { id } = req.params;
  const { description, lang } = req.body;

  try {
    const logo = await LogoModel.findByPk(id);
    if (!logo) {
      return res.status(404).json({ message: "logo not found" });
    }
    const imageUrl = req.file ? `${req.file.filename}` : logo.image;
    // Update logo fields
    logo.description = description || logo.description;
    logo.lang = lang || logo.lang;
    logo.image = imageUrl; 

    await logo.save();

    // Return the updated logo object
    res.status(200).json({ message: "logo updated successfully", logo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating logo", error });
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
  
