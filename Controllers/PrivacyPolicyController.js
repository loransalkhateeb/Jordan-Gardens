const PrivacyPolicy = require('../Models/PrivacyPolicy');


exports.createPrivacyPolicy = async (req, res) => {
  try {
    const { description, lang } = req.body;

 
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const newPrivacyPolicy = await PrivacyPolicy.create({
      description,
      lang,
    });

    res.status(201).json({ message: 'PrivacyPolicy created successfully', PrivacyPolicy: newPrivacyPolicy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create PrivacyPolicy' });
  }
};



exports.getAllPrivacyPolicy = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const privacypolicy = await PrivacyPolicy.findAll({ where: { lang } });
  
      res.status(200).json(privacypolicy);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch privacypolicy' });
    }
  };


  exports.getPrivacyPolicyById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const privacypolicy = await PrivacyPolicy.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!privacypolicy) {
        return res.status(404).json({ error: 'PrivacyPolicy not found' });
      }
      res.status(200).json(privacypolicy);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch PrivacyPolicy' });
    }
  };

  exports.updateprivacypolicy = async (req, res) => {
    try {
      const { id } = req.params;
      const {  description, lang } = req.body;
    
      const privacypolicy = await PrivacyPolicy.findByPk(id);
  
      if (!privacypolicy) {
        return res.status(404).json({ error: 'privacypolicy not found' });
      }
  
  
    
      privacypolicy.description = description || privacypolicy.description;
      privacypolicy.lang = lang || privacypolicy.lang;
  
      await privacypolicy.save();
  
      res.status(200).json({ message: 'privacypolicy updated successfully', privacypolicy });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update privacypolicy' });
    }
  };
  




  exports.deletePrivacyPolicy = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const privacypolicy = await PrivacyPolicy.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!privacypolicy) {
        return res.status(404).json({ error: 'PrivacyPolicy not found for the specified language' });
      }
      await privacypolicy.destroy();
      res.status(200).json({ message: 'PrivacyPolicy deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete PrivacyPolicy' });
    }
  };
  
