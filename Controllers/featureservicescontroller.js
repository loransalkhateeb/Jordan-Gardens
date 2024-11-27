const FeatureServices = require('../Models/featureservices');
const Services = require('../Models/services'); 


exports.createFeatureService = async (req, res) => {
  try {
    const { title, lang, service_id } = req.body;
    let imageUrl = null;

 
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const service = await Services.findByPk(service_id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    if (req.file) {
      imageUrl = req.file.filename;  
    }

    const newFeatureService = await FeatureServices.create({
      title,
      lang,
      service_id,
      image: imageUrl,
    });

    res.status(201).json({ message: 'Feature Service created successfully', featureService: newFeatureService });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create feature service' });
  }
};



exports.getAllServicesfeatures = async (req, res) => {
  try {
    const { lang } = req.params;
    const servicesfeatures = await FeatureServices.findAll({ where: { lang } });
    res.status(200).json(servicesfeatures);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch servicesfeatures' });
  }
};


exports.getFeatureServiceById = async (req, res) => {
  try {
    const { id, lang } = req.params;  

    
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const featureService = await FeatureServices.findOne({
      where: { id, lang }, 
    });

    if (!featureService) {
      return res.status(404).json({ error: 'FeatureService not found' });
    }

    res.status(200).json(featureService);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feature service' });
  }
};



exports.getFeatureServiceByservice_Id = async (req, res) => {
  try {
    const { service_Id, lang } = req.params;  

    
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const featureService = await FeatureServices.findAll({
      where: { service_Id, lang }, 
    });

    if (!featureService) {
      return res.status(404).json({ error: 'FeatureService by service_Id not found' });
    }

    res.status(200).json(featureService);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feature service by service_Id' });
  }
};

exports.updateFeatureService = async (req, res) => {
  try {
    const { id } = req.params;  
    const { title, service_id, lang } = req.body; 

   
    if (lang && !['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const featureService = await FeatureServices.findOne({
      where: { id },  
    });

    if (!featureService) {
      return res.status(404).json({ error: 'FeatureService not found' });
    }

 
    featureService.title = title || featureService.title;
    featureService.service_id = service_id || featureService.service_id;

   
    if (lang) {
      featureService.lang = lang;
    }

   
    if (req.file) {
      featureService.image = req.file.filename;
    }

    await featureService.save();
    res.status(200).json({ message: 'FeatureService updated successfully', featureService });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update feature service' });
  }
};





exports.updateFeatureServicebyservice_id = async (req, res) => {
  try {
    const { service_id } = req.params;
    const { title, lang } = req.body;

   
    if (lang && !['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

   
    const featureService = await FeatureServices.findOne({
      where: { service_id }, 
    });


    if (!featureService) {
      return res.status(404).json({ error: 'FeatureService not found' });
    }

    
    featureService.title = title || featureService.title;
    featureService.service_id = service_id || featureService.service_id;

    if (lang) {
      featureService.lang = lang;
    }

  
    if (req.file) {
      featureService.image = req.file.filename;
    }

    await featureService.save();
    res
      .status(200)
      .json({ message: 'FeatureService updated successfully', featureService });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update feature service' });
  }
};




exports.deleteFeatureService = async (req, res) => {
  try {
    const { id, lang } = req.params;  

    
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const featureService = await FeatureServices.findOne({
      where: { id, lang }, 
    });

    if (!featureService) {
      return res.status(404).json({ error: 'FeatureService not found' });
    }

    await featureService.destroy();
    res.status(200).json({ message: 'FeatureService deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feature service' });
  }
};



exports.deleteFeatureServiceByServiceId = async (req, res) => {
  try {
    const { service_id, lang } = req.params;  

    
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const featureService = await FeatureServices.findOne({
      where: { service_id, lang }, 
    });

    if (!featureService) {
      return res.status(404).json({ error: 'FeatureService by service_id not found' });
    }

    await featureService.destroy();
    res.status(200).json({ message: 'FeatureService service_id deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feature service by service_id' });
  }
};