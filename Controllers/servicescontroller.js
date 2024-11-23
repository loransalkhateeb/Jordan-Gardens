const Services = require('../Models/services');
const path = require('path');


exports.createService = async (req, res) => {
  try {
    const { title, description, lang } = req.body;
    let imageUrl = null;

    if (!title || !description || !lang) {
      return res.status(400).json({ error: 'Title, description, and language are required' });
    }


    if (req.file) {
      imageUrl = req.file.filename; 
    }

    const newService = await Services.create({
      title,
      description,
      lang,
      image: imageUrl, 
    });

    res.status(201).json({ message: 'Service created successfully', service: newService });
  } catch (error) {
    console.error("Error creating service:", error); 
    res.status(500).json({ error: 'Failed to create service' });
  }
};


exports.getAllServices = async (req, res) => {
  try {
    const { lang } = req.params;
    const services = await Services.findAll({ where: { lang } });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};


exports.getServiceById = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const service = await Services.findOne({ where: { id, lang } });

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
};


exports.updateService = async (req, res) => {
  try {
    const { id, lang } = req.params; 
    const { title, description } = req.body; 

    const service = await Services.findOne({ where: { id, lang } }); 

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

  
    service.title = title || service.title;
    service.description = description || service.description;

    
    service.lang = req.body.lang || service.lang;  

    
    if (req.file) {
      service.image = req.file.filename;
    }

    await service.save(); 

    res.status(200).json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
};


exports.deleteService = async (req, res) => {
  try {
    const { id, lang } = req.params; 
    const service = await Services.findOne({ where: { id, lang } });

    if (!service) {
      return res.status(404).json({ error: 'Service not found for the given language' });
    }
    await service.destroy();
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};