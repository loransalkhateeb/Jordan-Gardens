const Project = require('../Models/Project');
const ProjectImage = require('../Models/ProjectImage');
const Service = require('../Models/services');  


exports.createProject = async (req, res) => {
  try {
    const { title, description, lang, location, service_id } = req.body;

   
    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

  
    const service = await Service.findByPk(service_id);
    if (!service) {
      return res.status(400).json({ error: 'Service not found' });
    }

    const newProject = await Project.create({
      title,
      description,
      lang,
      location,
      service_id
    });

 
    if (req.files && req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        await ProjectImage.create({
          project_id: newProject.id,
          image: req.files[i].filename
        });
      }
    }

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
};


exports.getAllProjects = async (req, res) => {
  try {
    const { lang } = req.params;

    if (!['ar', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const projects = await Project.findAll({
      where: { lang },
      include: [
        { model: ProjectImage }, 
        { model: Service, as: 'service' } 
      ]
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};


exports.getProjectById = async (req, res) => {
    try {
      const { id, lang } = req.params;  
  
  
      const project = await Project.findOne({
        where: {
          id, 
          lang  
        },
        include: [
          { model: ProjectImage }, 
          { model: Service, as: 'service' } 
        ]
      });
  
   
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch project' });
    }
  };
  


  exports.updateProject = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, lang, location, service_id } = req.body;
  
 
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
  
     
      const service = await Service.findByPk(service_id);
      if (!service) {
        return res.status(400).json({ error: 'Service not found' });
      }
  
    
      project.title = title || project.title;
      project.description = description || project.description;
      project.lang = lang || project.lang;
      project.location = location || project.location;
      project.service_id = service_id || project.service_id;
  
      await project.save();
  
    
      if (req.files && req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          await ProjectImage.create({
            project_id: project.id,
            image: req.files[i].filename
          });
        }
      }
  
      res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update project' });
    }
  };
  


exports.deleteProject = async (req, res) => {
    try {
      const { id, lang } = req.params;  
      const project = await Project.findOne({
        where: {
          id, 
          lang 
        }
      });
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      await ProjectImage.destroy({ where: { project_id: project.id } });
      await project.destroy();
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete project' });
    }
};
  
