const TermsAndConditions = require('../Models/TermsAndConditions');


exports.createTermsAndConditions = async (req, res) => {
  try {
    const { description, lang } = req.body;

 
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const newTermsAndConditions= await TermsAndConditions.create({
      description,
      lang,
    });

    res.status(201).json({ message: 'TermsAndConditions created successfully', TermsAndConditions: newTermsAndConditions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create TermsAndConditions' });
  }
};



exports.getTermsAndConditions = async (req, res) => {
    try {
      const { lang } = req.params;
  
      const termsAndConditions = await TermsAndConditions.findAll({ where: { lang } });
  
      res.status(200).json(termsAndConditions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch TermsAndConditions' });
    }
  };


  exports.getTermsAndConditionsById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const termsAndConditions = await TermsAndConditions.findOne({
        where: {
          id, 
          lang  
        },
      });
  
   
      if (!termsAndConditions) {
        return res.status(404).json({ error: 'TermsAndConditions not found' });
      }
      res.status(200).json(termsAndConditions);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch PrivacyPolicy' });
    }
  };

  exports.updateTermsAndConditions = async (req, res) => {
    try {
      const { id } = req.params;
      const {  description, lang } = req.body;
    
      const termsAndConditions = await TermsAndConditions.findByPk(id);
  
      if (!termsAndConditions) {
        return res.status(404).json({ error: 'TermsAndConditions not found' });
      }
    
      termsAndConditions.description = description || termsAndConditions.description;
      termsAndConditions.lang = lang || termsAndConditions.lang;
  
      await termsAndConditions.save();
  
      res.status(200).json({ message: 'termsAndConditions updated successfully', termsAndConditions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update termsAndConditions' });
    }
  };
  




  exports.deletetermsAndConditions = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const termsAndConditions = await TermsAndConditions.findOne({
        where: {
          id,
          lang,
        },
      });
      if (!termsAndConditions) {
        return res.status(404).json({ error: 'termsAndConditions not found for the specified language' });
      }
      await termsAndConditions.destroy();
      res.status(200).json({ message: 'TermsAndConditions deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete TermsAndConditions' });
    }
  };
  
