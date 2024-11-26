const Career = require('../Models/Careers');


exports.createCareer = async (req, res) => {
  try {
    const { position, numberOfPositions, location, experience, lang } = req.body;
    const newCareer = await Career.create({
      position,
      numberOfPositions,
      location,
      experience,
      lang, 
    });

    const message = lang === 'ar' ? 'تم إنشاء الوظيفة بنجاح' : 'Career created successfully';
    res.status(201).json({ message, career: newCareer });
  } catch (error) {
    const errorMessage = lang === 'ar' ? 'فشل في إنشاء الوظيفة' : 'Failed to create career';
    res.status(500).json({ error: errorMessage });
  }
};


exports.getAllCareers = async (req, res) => {
  try {
    const { lang } = req.params; 

    const careers = await Career.findAll({ where: { lang } });

    if (careers.length === 0) {
      const message = lang === 'ar' ? 'لا توجد وظائف حالياً' : 'No careers available';
      return res.status(404).json({ error: message });
    }

    res.status(200).json(careers);
  } catch (error) {
    const errorMessage = lang === 'ar' ? 'فشل في جلب الوظائف' : 'Failed to fetch careers';
    res.status(500).json({ error: errorMessage });
  }
};


exports.getCareerById = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const career = await Career.findOne({ where: { id, lang } });

    if (!career) {
      const message = lang === 'ar' ? 'الوظيفة غير موجودة' : 'Career not found';
      return res.status(404).json({ error: message });
    }

    res.status(200).json(career);
  } catch (error) {
    const errorMessage = lang === 'ar' ? 'فشل في جلب الوظيفة' : 'Failed to fetch career';
    res.status(500).json({ error: errorMessage });
  }
};


exports.updateCareer = async (req, res) => {
  try {
    const { id } = req.params;  
    const { position, numberOfPositions, location, experience, lang } = req.body; 


    const career = await Career.findOne({ where: { id } });

    if (!career) {
      const message = lang === 'ar' ? 'الوظيفة غير موجودة' : 'Career not found';
      return res.status(404).json({ error: message });
    }


    career.position = position || career.position;
    career.numberOfPositions = numberOfPositions || career.numberOfPositions;
    career.location = location || career.location;
    career.experience = experience || career.experience;

    
    if (lang) {
      career.lang = lang;
    }

    await career.save();

    const message = lang === 'ar' ? 'تم تحديث الوظيفة بنجاح' : 'Career updated successfully';
    res.status(200).json({ message, career });
  } catch (error) {
    const errorMessage = req.body.lang === 'ar' ? 'فشل في تحديث الوظيفة' : 'Failed to update career';
    res.status(500).json({ error: errorMessage });
  }
};



exports.deleteCareer = async (req, res) => {
  try {
    const { id, lang } = req.params;
    const career = await Career.findOne({ where: { id, lang } });

    if (!career) {
      const message = lang === 'ar' ? 'الوظيفة غير موجودة' : 'Career not found';
      return res.status(404).json({ error: message });
    }

    await career.destroy();
    const message = lang === 'ar' ? 'تم حذف الوظيفة بنجاح' : 'Career deleted successfully';
    res.status(200).json({ message });
  } catch (error) {
    const errorMessage = lang === 'ar' ? 'فشل في حذف الوظيفة' : 'Failed to delete career';
    res.status(500).json({ error: errorMessage });
  }
};
