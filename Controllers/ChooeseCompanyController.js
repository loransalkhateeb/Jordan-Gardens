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
  
      const choosecompay = await ChooeseCompanyModel.findAll({ where: { lang } });
  
      res.status(200).json(feedbacks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch FeedBack' });
    }
  };


  exports.getchoosecompayById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const choosecompay = await ChooeseCompanyModel.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!choosecompay) {
        return res.status(404).json({ error: 'choosecompay not found' });
      }
      res.status(200).json(choosecompay);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch choosecompay' });
    }
  };

  exports.updateChooseCompany = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, lang } = req.body;
  

      if (!['ar', 'en'].includes(lang)) {
        return res.status(400).json({ error: lang === 'ar' ? 'Invalid language' : 'Invalid language' });
      }
  
     
      const choosecompay = await ChooeseCompanyModel.findOne({
        where: { id, lang },
      });
  
      if (!choosecompay) {
        return res.status(404).json({ error: lang === 'ar' ? 'choosecompay not found' : 'choosecompay not found' });
      }
  
      
      choosecompay.title = title;
      choosecompay.lang = lang;
  
     
      await choosecompay.save();
  
      res.status(200).json({
        message: lang === 'ar' ? 'choosecompay updated successfully' : 'choosecompay updated successfully',
        choosecompay
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: lang === 'ar' ? ' Faild to updated the choosecompay' : 'Failed to update choosecompay'
      });
    }
  };
  




  exports.deleteChooseCompany = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const choosecompay = await ChooeseCompanyModel.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!choosecompay) {
        return res.status(404).json({ error: 'choosecompay not found for the specified language' });
      }
      await choosecompay.destroy();
      res.status(200).json({ message: 'choosecompay deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete choosecompay' });
    }
  };
  
