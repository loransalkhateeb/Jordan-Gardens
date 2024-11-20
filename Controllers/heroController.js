const Hero = require('../Models/Hero');
const path = require('path');

exports.createHero = async (req, res) => {
  try {
    const { title, description, title_btn, link, lang } = req.body;
    let imageUrl = null;

    if (req.file) {
      imageUrl = req.file.filename;  
    }

    const newHero = await Hero.create({
      title,
      description,
      title_btn,
      link,
      lang,
      image: imageUrl,
    });

    res.status(201).json({ message: 'Hero created successfully', hero: newHero });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create hero' });
  }
};


exports.getAllHeroes = async (req, res) => {
  try {
    const { lang } = req.params;
    const heroes = await Hero.findAll({ where: { lang } });
    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch heroes' });
  }
};


exports.getHeroById = async (req, res) => {
  try {
    const { id, lang } = req.params; 
    const hero = await Hero.findOne({
      where: {
        id: id,
        lang: lang,  
      },
    });

    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch hero' });
  }
};


exports.updateHero = async (req, res) => {
    try {
      const { id, lang } = req.params;
      const { title, description, title_btn, link } = req.body;
  

      const hero = await Hero.findOne({ where: { id, lang } });
  
      if (!hero) {
        return res.status(404).json({ error: 'Hero not found' });
      }
      hero.title = title || hero.title;
      hero.description = description || hero.description;
      hero.title_btn = title_btn || hero.title_btn;
      hero.link = link || hero.link;
  
      if (req.file) {
        hero.image = req.file.filename;
      }
  

      console.log('After Update:', hero);
      await hero.save();
      res.status(200).json({ message: 'Hero updated successfully', hero });
    } catch (error) {
      console.error('Error updating hero:', error);
      res.status(500).json({ error: 'Failed to update hero' });
    }
  };
  


exports.deleteHero = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const hero = await Hero.findOne({ where: { id, lang } });

    if (!hero) {
      return res.status(404).json({ error: 'Hero not found' });
    }

    await hero.destroy();
    res.status(200).json({ message: 'Hero deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete hero' });
  }
};
