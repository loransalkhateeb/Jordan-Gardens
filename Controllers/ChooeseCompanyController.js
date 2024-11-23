const ChooeseCompanyModel = require('../Models/ChooseCompanyModel');


exports.createChooseCompany = async (req, res) => {
    try {
      const { title, lang } = req.body;
      let imageUrl = null;
  
      if (req.file) {
        imageUrl = req.file.filename;  
      }
  
      const newChooseCompany = await ChooeseCompanyModel.create({
        title,
        lang,
        image: imageUrl,
      });
  
      res.status(201).json({ message: 'Choose Company created successfully', hero: newChooseCompany });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create Choose Company'});
    }
  };


exports.getAllChoosesCompany = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const choosesompany = await ChooeseCompanyModel.findAll({ where: { lang } });
  
      res.status(200).json(choosecompay);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch FeedBack' });
    }
  };


  exports.getchoosesompanyById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const choosesompany = await ChooeseCompanyModel.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!choosesompany) {
        return res.status(404).json({ error: 'choosesompany not found' });
      }
      res.status(200).json(choosesompany);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch choosesompany' });
    }
  };

  exports.updateChooseCompany = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, lang } = req.body;
      const image = req.file ? req.file.filename : null;  
      const choosesompany = await ChooeseCompanyModel.findByPk(id);
  
      if (!choosesompany) {
        return res.status(404).json({ error: 'choosesompany not found' });
      }
  

      choosesompany.title = title || choosesompany.title;
      choosesompany.lang = lang || choosesompany.lang;
  

      if (image) {
        choosesompany.image = image; 
      }
  

      await choosesompany.save();
  

      res.status(200).json({ message: 'choosesompany updated successfully', choosesompany });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update choosesompany' });
    }
  };
  
  
  
  




  exports.deleteChooseCompany = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const choosesompany = await ChooeseCompanyModel.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!choosesompany) {
        return res.status(404).json({ error: 'choosesompany not found for the specified language' });
      }
      await choosesompany.destroy();
      res.status(200).json({ message: 'choosesompany deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete choosesompany' });
    }
  };
  
