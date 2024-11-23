const About = require('../Models/About');
const path = require('path');

exports.createAbout = async (req, res) => {
  try {
      const { title, description, title_btn, link, lang } = req.body;
      let imageUrl = null;

      if (req.file) {
          imageUrl = req.file.filename;
      }

      const newAbout = await About.create({
          title,
          description,
          title_btn,
          link,
          lang,
          image: imageUrl,
      });

      res.status(201).json({ message: 'About created successfully', about: newAbout });
  } catch (error) {
      console.error('Error:', error); 
      res.status(500).json({ error: 'Failed to create About', details: error.message }); 
  }
};


exports.getAllAbouts = async (req, res) => {
  try {
    const { lang } = req.params;
    const abouts = await About.findAll({ where: { lang } });
    res.status(200).json(abouts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch About' });
  }
};

exports.getAboutById = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const about = await About.findOne({
      where: { id, lang },
    });

    if (!about) {
      return res.status(404).json({ error: 'About not found' });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch About' });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const { title, description, title_btn, link } = req.body;

    const about = await About.findOne({
      where: { id, lang },
    });

    if (!about) {
      return res.status(404).json({ error: 'About not found' });
    }

    about.title = title || about.title;
    about.description = description || about.description;
    about.title_btn = title_btn || about.title_btn;
    about.link = link || about.link;

    if (req.file) {
      about.image = req.file.filename;
    }

    await about.save();
    res.status(200).json({ message: 'About updated successfully', about });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update About' });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByPk(id);

    if (!about) {
      return res.status(404).json({ error: 'About not found' });
    }

    await about.destroy();
    res.status(200).json({ message: 'About deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete About' });
  }
};
