const Advantages = require('../Models/advantages');
const Services = require('../Models/services');





exports.createAdvantage = async (req, res) => {
  try {
    const { title, lang, service_id } = req.body;

    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

   
    const service = await Services.findByPk(service_id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const newAdvantage = await Advantages.create({
      title,
      lang,
      service_id,
    });

    res.status(201).json({ message: 'Advantage created successfully', advantage: newAdvantage });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create advantage' });
  }
};

  


exports.getAllServicesadvantages = async (req, res) => {
    try {
      const { lang } = req.params;
      const servicesadvatntages = await Advantages.findAll({ where: { lang } });
      res.status(200).json(servicesadvatntages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch servicesfeatures' });
    }
  };
  

exports.getAdvantageById = async (req, res) => {
  try {
    const { id, lang } = req.params; 

   
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const advantage = await Advantages.findOne({
      where: { id, lang },  
    });

    if (!advantage) {
      return res.status(404).json({ error: 'Advantage not found' });
    }

    res.status(200).json(advantage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advantage' });
  }
};

exports.getAdvantageByServicesId = async (req, res) => {
  try {
    const { service_id,lang } = req.params; 

    // Validate the language
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    // Fetch multiple advantages based on the language
    const advantages = await Advantages.findAll({
      where: {service_id, lang },  // Only filter by language
    });

    // Check if there are any advantages found
    if (advantages.length === 0) {
      return res.status(404).json({ error: 'No advantages found' });
    }

    // Return the array of advantages
    res.status(200).json(advantages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch advantages' });
  }
};

exports.updateAdvantage = async (req, res) => {
    try {
      const { id } = req.params;  
      const { title, service_id, lang } = req.body;  
  
    
      if (lang && !['ar', 'en'].includes(lang)) {
        return res.status(400).json({ error: 'Invalid language' });
      }
  
   
      const advantageService = await Advantages.findOne({
        where: { id },
      });

      if (!advantageService) {
        return res.status(404).json({ error: 'AdvantageService not found' });
      }
  

      advantageService.title = title || advantageService.title;
      advantageService.service_id = service_id || advantageService.service_id;
  
      
      if (lang) {
        advantageService.lang = lang;
      }
  
      if (req.file) {
        advantageService.image = req.file.filename;
      }
  
    
      await advantageService.save();
  
      res.status(200).json({ message: 'AdvantageService updated successfully', advantageService });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update advantage service' });
    }
  };
  


exports.deleteAdvantage = async (req, res) => {
  try {
    const { id, lang } = req.params;  

 
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const advantage = await Advantages.findOne({
      where: { id, lang },
    });

    if (!advantage) {
      return res.status(404).json({ error: 'Advantage not found' });
    }

    await advantage.destroy();
    res.status(200).json({ message: 'Advantage deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete advantage' });
  }
};
