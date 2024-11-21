const ProjectImages = require('../Models/ProjectImage');  
const { Sequelize } = require('sequelize');


exports.createProjectImage = async (req, res) => {
    try {
      const images = req.files ? req.files.map(file => file.filename) : [];
  
      if (images.length === 0) {
        return res.status(400).json({ error: 'Images are required' });
      }
  

      const newImage = await ProjectImages.create({
        images: images.join(', ')  
      });
  
      res.status(201).json({ message: 'Project Image created successfully', image: newImage });
    } catch (error) {
      console.error('Error creating project image:', error);  
      res.status(500).json({ error: 'Failed to create project image', details: error.message });
    }
  };
  

exports.getAllProjectImages = async (req, res) => {
  try {
    const images = await ProjectImages.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project images' });
  }
};


exports.getProjectImageById = async (req, res) => {
  try {
    const { id } = req.params;  

 
    const image = await ProjectImages.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Project Image not found' });
    }

    res.status(200).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project image' });
  }
};


exports.updateProjectImage = async (req, res) => {
  try {
    const { id } = req.params;  
    const { images } = req.body;  


    const image = await ProjectImages.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Project Image not found' });
    }


    image.images = images || image.images;

    
    await image.save();
    res.status(200).json({ message: 'Project Image updated successfully', image });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project image' });
  }
};


exports.deleteProjectImage = async (req, res) => {
  try {
    const { id } = req.params;  

    const image = await ProjectImages.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Project Image not found' });
    }

  
    await image.destroy();
    res.status(200).json({ message: 'Project Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project image' });
  }
};
